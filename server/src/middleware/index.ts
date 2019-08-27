import { Request, Response, NextFunction } from 'express';
import { decode } from 'jsonwebtoken';
import fetch from 'node-fetch';
import { JWK, JWS } from 'node-jose';

import { logError } from '../helpers/logging';
import BaseError from '../errors/error';
import NotAuthorisedError from '../errors/not-authourised-error';
import { userService } from '../services';

let jwtTokenStore: JWK.KeyStore;

async function getTokenStore() {
  if(jwtTokenStore) return jwtTokenStore;
  
  const wellknownRes = await fetch(process.env.OPENID_CONFIG_URL || '');
  const openIdConnectConfiguration = await wellknownRes.json();
  
  const tokenStoreUrl = openIdConnectConfiguration['jwks_uri'];
  const tokenRes = await fetch(tokenStoreUrl);
  const tokenStoreJson = await tokenRes.json();

  jwtTokenStore = await JWK.asKeyStore(tokenStoreJson);
  return jwtTokenStore;
}

export function verifyAuth(req: any, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    throw new NotAuthorisedError();
  }

  const [prefix, token] = authHeader.split(' ');

  if(prefix !== 'Bearer'){
    throw new NotAuthorisedError('Authentication is configured incorrectly.');
  }


  // Express middleware seems to be allergic to async await so vanilla promises will have to do
  getTokenStore()
    .then((keyStore) => JWS.createVerify(keyStore).verify(token))
    .then((key: JWS.VerificationResult) => {
      req.token = key.payload.toString();
      next();
    })
    .catch(() => {
      next(new NotAuthorisedError('JWT token is invalid.'));
      return;
    });
}

export function verifyProfile(req: any, res: Response, next: NextFunction) {
  let token = JSON.parse(req.token);
  let email = token.emails[0];
  userService.getUserByEmail(email)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      next(err);
      return;
    });
}

export function verifyOrganisation(req: any, res: Response, next: NextFunction) {
  let user = req.user;
  let orgId = req.params.organisationId;

  if(!orgId) {
    throw new NotAuthorisedError('No organisation ID supplied on an organisation protected route.');
  };

  if(user.superadmin) {
    next();
    return;
  }

  if(!user.organisations || !user.organisations.length) {
    throw new NotAuthorisedError('This user is not in any organisations.');
  }

  
  let isInOrg = user.organisations.includes(orgId);
  if(!isInOrg) {
    throw new NotAuthorisedError('This user is not in that organisation.');
  }
  next()
}

export function handleError(err: BaseError, req: Request, res: Response, next: NextFunction) {
  logError(err);
  res.status(err.code);
  res.send(err.toJSON());
  next()
}