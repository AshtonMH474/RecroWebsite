import { JwksClient } from "jwks-rsa";
import jwt from 'jsonwebtoken';


const client = new JwksClient({
  jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key?.getPublicKey();
    callback(null, signingKey);
  });
}

export const CustomBackendAuth = () => {
  return {
    isAuthorized: async (req, res) => {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace('Bearer ', '');

      if (!token) {
        return {
          isAuthorized: false,
          errorMessage: 'No token provided',
          errorCode: 401,
        };
      }

      try {
        const decoded = await new Promise((resolve, reject) => {
          jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
          });
        });

        return { isAuthorized: true };
      } catch (e) {
        return {
          isAuthorized: false,
          errorMessage: 'Invalid token',
          errorCode: 401,
        };
      }
    },
  };
};