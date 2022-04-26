FROM node:12 as base

WORKDIR /usr/src/app
COPY package*.json ./
COPY ./src ./src
COPY .env* ./
COPY tsconfig.json ./
RUN npm i && npm run build && rm -rf src


EXPOSE 4000 4001
CMD ["node", "./dist/index.js"]