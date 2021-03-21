import jwt from 'express-jwt';
import jwks from 'jwks-rsa';


const AUTH0_JWKS_URI = process.env.AUTH0_JWKS_URI;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;
const AUTH0_ISSUER = process.env.AUTH0_ISSUER;
const AUTH0_ALGORITHMS = process.env.AUTH0_ALGORITHMS;


const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: AUTH0_JWKS_URI,
    }),
    audience: AUTH0_AUDIENCE,
    issuer: AUTH0_ISSUER,
    algorithms: [AUTH0_ALGORITHMS]
});

export { authCheck };
