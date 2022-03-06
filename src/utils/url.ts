import { Config } from '../config';

export const targetUrl = ({ host, repo }: Pick<Config, 'host' | 'repo'>) =>
  `https://${host}/npm/${repo}/`;

export const tarballUrl = ({
  authToken,
  host,
}: Pick<Config, 'host'> & { authToken: string }) =>
  `https://aws:${authToken}@${host}`;
