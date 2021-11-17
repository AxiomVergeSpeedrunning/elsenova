FROM node:alpine

RUN apk add python2

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
