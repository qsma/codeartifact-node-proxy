import express from 'express';
import { authTokenGenerate } from './middlewares/auth-token-generate';
import { npmProxy } from './middlewares/npm-proxy';
import { staticTokens } from './middlewares/static-tokens';
import { config } from './config';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/', staticTokens, authTokenGenerate, npmProxy);

app.listen(config.port, () =>
  console.log(`🚀 Server ready at: http://localhost:${config.port}`)
);
