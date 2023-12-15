FROM node:18-alpine as Development
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
CMD npm run start:dev

FROM node:18-alpine as Build
WORKDIR /app
COPY package*.json /app
RUN npm install --only=production
COPY . /app
RUN npm run build

FROM node:18-alpine as Deploy
WORKDIR /app
COPY package*.json /app
COPY --from=Build ./build /app
CMD npm run start