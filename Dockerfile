FROM node:latest

RUN apt-get update
RUN apt-get install -y sqlite3 libsqlite3-dev libsqlite3-0 build-essential gcc python

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
