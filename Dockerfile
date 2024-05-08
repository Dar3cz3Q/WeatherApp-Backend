FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm i --production

COPY . .

EXPOSE ${NODE_PORT}

CMD ["npm", "run", "start"]