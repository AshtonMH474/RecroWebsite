import { createMediaHandler } from 'next-tinacms-s3/dist/handlers';
import jwt from 'jsonwebtoken';
import { JwksClient } from 'jwks-rsa';
import cookie from 'cookie';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default createMediaHandler({
  config: {
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY || '',
      secretAccessKey: process.env.S3_SECRET_KEY || '',
    },
    region: process.env.S3_REGION,
  },
  bucket: process.env.S3_BUCKET || '',
  authorized: async (req, _res) => {
    if (process.env.TINA_PUBLIC_IS_LOCAL === 'true') {
      console.log('Local mode: always authorized');
      return true;
    }

    const ok = await isAuthorized(req);
    console.log('Authorized check:', req.method, ok);
    return ok;
  },
});

const client = new JwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

async function isAuthorized(req) {
  const authHeader = req.headers.authorization;
  let token = authHeader?.replace('Bearer ', '');
  let tokenSource = 'header';

  if (!token && req.headers.cookie) {
    const cookies = cookie.parse(req.headers.cookie);
    token = cookies.token;
    tokenSource = 'cookie';
  }

  if (!token) return false;

  try {
    const decoded = jwt.decode(token, { complete: true });
    if (!decoded || !decoded.header) {
      console.error('Invalid token format');
      return false;
    }

    const algorithm = decoded.header.alg;

    if (algorithm === 'RS256') {
      return await new Promise((resolve) => {
        jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, payload) => {
          if (!err && payload) {
            console.log('Verified RS256 (Google) token');
            return resolve(true);
          }
          console.error('RS256 verification failed');
          resolve(false);
        });
      });
    } else if (algorithm === 'HS256') {
      if (tokenSource !== 'cookie') {
        console.error('HS256 tokens only accepted from cookies');
        return false;
      }
      const payload = jwt.verify(token, process.env.JWT_SECRET, {
        algorithms: ['HS256'],
      });
      if (payload) {
        console.log('Verified HS256 (local) cookie token');
        return true;
      }
      return false;
    } else {
      console.error(`Unsupported algorithm: ${algorithm}`);
      return false;
    }
  } catch (e) {
    console.error('JWT verification error:', e.message);
    return false;
  }
}
