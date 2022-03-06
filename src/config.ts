import 'dotenv/config';

export type Config = {
  repo: string;
  domain: string;
  ownerId: string;
  host: string;
  accessTokens?: string[];
};

const { REPO, DOMAIN, OWNER_ID, HOST, ACCESS_TOKENS } = process.env as Record<
  string,
  string
>;

if (
  ![REPO, DOMAIN, OWNER_ID, HOST, ACCESS_TOKENS].every(
    (element) => element !== undefined
  )
) {
  console.log(
    'Error, env configuration is missing for one of the values, use .env.template as template'
  );
  process.exit(1);
}

export const config: Config = {
  repo: REPO,
  domain: DOMAIN,
  ownerId: OWNER_ID,
  host: HOST,
  accessTokens: ACCESS_TOKENS?.split(',') || [],
};
