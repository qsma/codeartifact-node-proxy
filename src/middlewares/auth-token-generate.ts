import { NextFunction, Request, Response } from 'express';
import * as AWS from '@aws-sdk/client-codeartifact';
import { config } from '../config';
import { ONE_HOUR_MS, ONE_HOUR_S } from '../constants';
import { kv } from '../utils/kv-memory';

const client = new AWS.Codeartifact({});

export const authTokenGenerate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(await kv.get('authToken'))) {
    const { authorizationToken } = await client.getAuthorizationToken({
      domain: config.domain,
      domainOwner: config.ownerId,
      durationSeconds: ONE_HOUR_S,
    });

    await kv.set('authToken', authorizationToken, ONE_HOUR_MS);
  }

  res.locals.authToken = await kv.get('authToken');

  next();
};
