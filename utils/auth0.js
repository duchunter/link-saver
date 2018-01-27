'use strict'

import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import {
  AUTH0_JWKS_URI,
  AUTH0_AUDIENCE,
  AUTH0_ISSUER,
  AUTH0_ALGORITHMS,
} from './auth0-config';


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
