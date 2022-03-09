FROM node:17-alpine

RUN npm install -g pm2

RUN mkdir -p /app
WORKDIR /app

COPY package.json yarn.lock .yarnrc.yml /app/
COPY .yarn /app/.yarn
RUN yarn

COPY . /app
RUN yarn build

EXPOSE 3000

CMD ["pm2-runtime", "dist/index.js"]