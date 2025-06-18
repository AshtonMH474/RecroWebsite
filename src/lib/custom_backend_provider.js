// import { JwksClient } from "jwks-rsa";
// import jwt from 'jsonwebtoken';


// const client = new JwksClient({
//   jwksUri: 'https://www.googleapis.com/oauth2/v3/certs',
// });

// function getKey(header, callback) {
//   client.getSigningKey(header.kid, function (err, key) {
//     const signingKey = key?.getPublicKey();
//     callback(null, signingKey);
//   });
// }

// export const CustomBackendAuth = () => {
//   return {
//     isAuthorized: async (req, res) => {
//       const authHeader = req.headers.authorization;
//       const token = authHeader?.replace('Bearer ', '');

//       if (!token) {
//         return {
//           isAuthorized: false,
//           errorMessage: 'No token provided',
//           errorCode: 401,
//         };
//       }

//       try {
//         const decoded = await new Promise((resolve, reject) => {
//           jwt.verify(token, getKey, { algorithms: ['RS256'] }, (err, decoded) => {
//             if (err) reject(err);
//             else resolve(decoded);
//           });
//         });

//         return { isAuthorized: true };
//       } catch (e) {
//         return {
//           isAuthorized: false,
//           errorMessage: 'Invalid token',
//           errorCode: 401,
//         };
//       }
//     },
//   };
// };
import { JwksClient } from "jwks-rsa";
import jwt from "jsonwebtoken";
import { signOut } from "next-auth/react";

const client = new JwksClient({
  jwksUri: "https://www.googleapis.com/oauth2/v3/certs",
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    if (err || !key) {
      console.error("[Auth] Failed to get signing key:", err);
      return callback(err);
    }
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

export const CustomBackendAuth = () => {
  return {
    name: "google-auth", // optional but helpful for debugging Tina auth

    isAuthorized: async (req, res) => {
      const authHeader = req.headers.authorization;
      const token = authHeader?.replace("Bearer ", "");
      if (!token) {
        console.warn("[Auth] No token provided");
        return {
          isAuthorized: false,
          errorMessage: "No token provided",
          errorCode: 401,
        };
      }

      try {
        const decoded = await new Promise((resolve, reject) => {
          jwt.verify(token, getKey, { algorithms: ["RS256"] }, async (err, decoded) => {
            if (err) {
              console.error("[Auth] JWT verification failed:", err);
              console.log(token)
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });

        console.log("[Auth] User authenticated:", decoded);

        // Optional: restrict by domain/email here if needed
        return {
          isAuthorized: true,
          user: {
            id: decoded.sub,
            email: decoded.email,
            name: decoded.name,
          },
        };
      } catch (err) {
        return {
          isAuthorized: false,
          errorMessage: "Invalid token",
          errorCode: 401,
        };
      }
    },
  };
};
