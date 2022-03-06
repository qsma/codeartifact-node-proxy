FROM fedora:35

ARG aws_access_key_id
ARG aws_secret_access_key
ARG region
ARG repo

RUN dnf update -y
RUN dnf install unzip nodejs -y
RUN npm install -g yarn ts-node

WORKDIR /usr/src/app
COPY package.json yarn.lock .env ./
RUN yarn install --immutable

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

RUN aws configure set aws_access_key_id $aws_access_key_id
RUN aws configure set aws_secret_access_key $aws_secret_access_key
RUN aws configure set default.region $region

COPY . .

EXPOSE 3000
CMD ["ts-node", "./src/index.ts"]