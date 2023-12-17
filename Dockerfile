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
ENV PORT_APP=5000
ENV BUCKET_NAME=SIDPA_BUCKET
ENV PROJECT_ID=artful-fragment-368703
ENV BUCKET_BASE_URL=BUCKET_BASE_URL=https://storage.googleapis.com/sidpa-bucket/bkt-img-
RUN npm run build

FROM node:20-alpine as deploy
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/build ./
COPY --from=build /app/src/Infrastructures/prisma/schema.prisma ./Infrastructures/prisma
COPY --from=build /app/upload ./
ENV PORT_APP=5000
ENV BUCKET_NAME=SIDPA_BUCKET
ENV PROJECT_ID=artful-fragment-368703
ENV BUCKET_BASE_URL=BUCKET_BASE_URL=https://storage.googleapis.com/sidpa-bucket/bkt-img-
RUN npm install --production
CMD npx prisma generate --schema ./Infrastructures/prisma/schema.prisma && npx prisma db push --schema=./Infrastructures/prisma/schema.prisma && npm run start 