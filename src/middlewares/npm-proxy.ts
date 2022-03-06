import {
  createProxyMiddleware,
  Options,
  responseInterceptor,
} from 'http-proxy-middleware';
import https from 'https';
import { config } from '../config';
import { kv } from '../utils/kv-memory';
import { tarballUrl, targetUrl } from '../utils/url';

const options: Options = {
  target: targetUrl(config),
  changeOrigin: true,
  agent: https.globalAgent,
  selfHandleResponse: true,
  logLevel: 'debug',
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Authorization', `Bearer ${res.locals.authToken}`);
  },
  onProxyRes: responseInterceptor(async (responseBuffer) => {
    const response = responseBuffer.toString('utf-8');

    return response.replaceAll(
      `https://${config.host}`,
      tarballUrl({
        ...config,
        authToken: await kv.get('authToken'),
      })
    );
  }),
};

export const npmProxy = createProxyMiddleware(options);
