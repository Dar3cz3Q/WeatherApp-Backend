FROM node:latest

WORKDIR /app

COPY . ./ 

RUN npm i --production

EXPOSE ${NODE_PORT}

CMD ["npm", "run", "start"]