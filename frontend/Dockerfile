FROM node:12-alpine

RUN mkdir -p /src/frontend

WORKDIR /src/frontend

COPY package.json /src/frontend

RUN npm install

COPY . /src/frontend

CMD ["npm", "run", "serve"]