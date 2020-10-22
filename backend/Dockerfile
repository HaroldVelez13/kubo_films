FROM node:12-alpine

RUN mkdir -p /src/backend

WORKDIR /src/backend

COPY package.json /src/backend

RUN npm install

COPY . /src/backend

CMD ["npm", "start"]