FROM node:18-alpine

WORKDIR /book/src/app
COPY package*.json ./

RUN npm install
COPY ./src ./src

COPY tsconfig.json ./
RUN npm install -g typescript

RUN tsc
EXPOSE 3000

CMD ["node", "build/server.js"]
