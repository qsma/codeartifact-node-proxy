import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { ONE_HOUR_MS, ONE_HOUR_S } from '../constants';
import { kv } from '../utils/kv-memory';
import { asyncExec } from '../utils/node';

export const authTokenGenerate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!(await kv.get('authToken'))) {
    const { stdout: authToken } = await asyncExec(
      `aws codeartifact get-authorization-token --domain ${config.domain} --domain-owner ${config.ownerId} --query authorizationToken --output text --duration-seconds ${ONE_HOUR_S}`
    );

    await kv.set('authToken', authToken.trim(), ONE_HOUR_MS);
  }

  res.locals.authToken = await kv.get('authToken');

  next();
};
