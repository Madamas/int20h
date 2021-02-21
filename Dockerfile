FROM madamas/int20h-base:1.2.0

WORKDIR /opt/app/server
COPY server/ /opt/app/server/
RUN yarn build
COPY ["server/.env.example", "/opt/app/server/dist/"]

WORKDIR /opt/app/client
COPY client/ /opt/app/client/
RUN yarn build

RUN ["cp", "-r", "/opt/app/client/build/", "/opt/app/server/public/"]

EXPOSE "${PORT}"

WORKDIR /opt/app/server

CMD ["node", "/opt/app/server/dist/index.js"]