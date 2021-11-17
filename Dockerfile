FROM node:16

RUN mkdir /code
WORKDIR /code

COPY . .

RUN rm -f .env

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
