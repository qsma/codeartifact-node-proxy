import express from 'express';
import { authTokenGenerate } from './middlewares/auth-token-generate';
import { npmProxy } from './middlewares/npm-proxy';
import { staticTokens } from './middlewares/static-tokens';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/', staticTokens, authTokenGenerate, npmProxy);

app.listen(3000, () =>
  console.log('🚀 Server ready at: http://localhost:3000')
);
