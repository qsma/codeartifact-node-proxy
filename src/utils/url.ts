import { Config } from '../config';

export const hostUrl = ({ domain, ownerId, region }: Config) =>
  `${domain}-${ownerId}.d.codeartifact.${region}.amazonaws.com`;

export const targetUrl = (config: Config) =>
  `https://${hostUrl(config)}/npm/${config.repository}/`;

export const tarballUrl = (config: Config, authToken: string) =>
  `aws:${authToken}@${hostUrl(config)}`;
