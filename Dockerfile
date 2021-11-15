FROM node:alpine as build

RUN apk add make sqlite sqlite-dev sqlite-libs python2
ENV PYTHON=python2

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

FROM node:alpine

RUN apk add make sqlite sqlite-dev sqlite-libs python2

COPY --from=build /code/lib/index.js .

CMD ["node", "index.js"]
