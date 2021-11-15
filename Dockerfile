FROM node:latest as build

RUN apt-get update
RUN apt-get install sqlite3 libsqlite3-dev libsqlite3-0 build-essential gcc

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN yarn install
RUN yarn compile

CMD ["yarn", "start"]

FROM node:latest

RUN apt-get update
RUN apt-get install sqlite3 libsqlite3-dev libsqlite3-0 build-essential gcc

RUN apk add make gcc sqlite sqlite-dev sqlite-libs python2

COPY --from=build /code/lib/index.js .

CMD ["node", "index.js"]
