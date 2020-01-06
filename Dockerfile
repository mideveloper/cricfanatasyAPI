FROM node:10.16.3-stretch-slim

WORKDIR /usr/app
COPY . .
RUN rm -rf node_modules
RUN npm install

EXPOSE 8000

CMD npm start
