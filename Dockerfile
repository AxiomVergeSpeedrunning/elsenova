FROM node:16 as build

RUN apt-get update
RUN apt-get install -y sqlite3 libsqlite3-dev libsqlite3-0 build-essential gcc python

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN yarn install
RUN yarn build
RUN yarn compile

FROM node:16

RUN apt-get update
RUN apt-get install -y sqlite3

COPY --from=build /code/lib/index.js .

CMD ["node", "index.js"]
