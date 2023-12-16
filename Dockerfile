FROM node:20-alpine as development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
CMD npm run start:dev

FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:20-alpine as deploy
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/build ./
RUN npm install --production
CMD npm run start