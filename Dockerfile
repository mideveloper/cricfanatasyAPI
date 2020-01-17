FROM node:10.16.3-stretch-slim

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8000

ENTRYPOINT [ "./entrypoint.sh" ]

CMD npm start