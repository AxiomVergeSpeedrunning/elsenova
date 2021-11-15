FROM node:alpine as build

RUN apk add sqlite sqlite-dev sqlite-libs

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

FROM node:alpine

RUN apk add sqlite sqlite-dev sqlite-libs

COPY --from=build /code/lib/index.js .

CMD ["node", "index.js"]
