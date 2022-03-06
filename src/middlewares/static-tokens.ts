import { NextFunction, Request, Response } from 'express';
import { config } from '../config';

export const staticTokens = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const { accessTokens } = config;

  const [, token] = authorization?.split(' ') || [];

  if (!accessTokens?.includes(token)) {
    return res.sendStatus(401);
  }

  return next();
};
