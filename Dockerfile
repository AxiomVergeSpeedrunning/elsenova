FROM node:latest as build

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN yarn install
RUN yarn build

CMD ["yarn", "start"]

FROM node:latest

COPY --from=build /code/lib/index.js .

CMD ["node", "index.js"]
