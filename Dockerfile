FROM node:alpine as build

RUN apk add sqlite sqlite-dev sqlite-libs sqlite3pp sqlite-static

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

FROM node:alpine

RUN apk add sqlite sqlite-dev sqlite-libs sqlite3pp sqlite-static

COPY --from=build /code/lib/index.js .

CMD ["node", "index.js"]
