# Stage 1: Build code
FROM node as builder
WORKDIR /usr/app/
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Start app
FROM node:lts-alpine as starter
WORKDIR /usr/app
COPY --from=builder /usr/app/ ./

RUN npm install -g serve

EXPOSE 3000
CMD serve dist -p 3000
