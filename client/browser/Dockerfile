
FROM node:20.11.1-alpine3.18 AS base
WORKDIR /app
RUN corepack enable
RUN yarn set version 3.8.1

COPY package.json yarn.lock ./
RUN yarn install

COPY . .
EXPOSE 5173

CMD ["yarn", "vite"]





