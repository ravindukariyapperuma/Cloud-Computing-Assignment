FROM node:14-alpine

# dependencies
WORKDIR /usr/src/app

COPY Package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# command
CMD [ "npm" , "start" ]