import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export type Config = {
  repo: string;
  domain: string;
  ownerId: string;
  host: string;
};

const { REPO, DOMAIN, OWNER_ID, HOST } = process.env as Record<string, string>;

export const config: Config = {
  repo: REPO,
  domain: DOMAIN,
  ownerId: OWNER_ID,
  host: HOST,
};
