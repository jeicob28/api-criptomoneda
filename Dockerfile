FROM node:16.20.2-buster

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

EXPOSE 3000/tcp

CMD ["npm", "start"]