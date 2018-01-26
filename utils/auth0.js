'use strict'

import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

// Auth0 data
const AUTH0_JWKS_URI = "https://gangplank.auth0.com/.well-known/jwks.json";
const AUTH0_AUDIENCE = "https://log.com";
const AUTH0_ISSUER = "https://gangplank.auth0.com/";
const AUTH0_ALGORITHMS = "RS256";

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: AUTH0_JWKS_URI
    }),
    audience: AUTH0_AUDIENCE,
    issuer: AUTH0_ISSUER,
    algorithms: [AUTH0_ALGORITHMS]
});

export { authCheck };
