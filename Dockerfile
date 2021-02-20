FROM node:14.15-alpine

WORKDIR /opt/app/server

COPY server/package.json server/yarn.lock server/.env.example /opt/app/server/
RUN yarn install --frozen-lockfile

COPY server/ /opt/app/server/
RUN yarn build
COPY ["server/.env.example", "/opt/app/server/dist/"]

WORKDIR /opt/app/client

COPY client/package.json client/yarn.lock /opt/app/client/
RUN yarn install --frozen-lockfile

COPY client/ /opt/app/client/
RUN yarn build

RUN ["cp", "-r", "/opt/app/client/build/", "/opt/app/server/dist/client/"]

EXPOSE "${PORT}"

CMD ["node", "/opt/app/server/dist/index.js"]