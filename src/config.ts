import 'dotenv/config';

export type Config = {
  domain: string;
  ownerId: string;
  region: string;
  repository: string;
  accessTokens: string[];
  port: number;
};

const { DOMAIN, OWNER_ID, REGION, REPOSITORY, ACCESS_TOKENS, PORT } =
  process.env as Record<string, string>;

if (
  ![DOMAIN, OWNER_ID, REGION, REPOSITORY, ACCESS_TOKENS, PORT].every(
    (element) => element !== undefined
  )
) {
  console.log(
    'Error, env configuration is missing for one of the values, use .env.template as template'
  );
  process.exit(1);
}

export const config: Config = {
  domain: DOMAIN,
  ownerId: OWNER_ID,
  region: REGION,
  repository: REPOSITORY,
  accessTokens: ACCESS_TOKENS?.split(',') || [],
  port: Number(PORT),
};
