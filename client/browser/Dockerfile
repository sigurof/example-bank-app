
FROM node:20.11.1-alpine3.18 as base
WORKDIR /app
RUN corepack enable
RUN yarn set version 3.8.1

COPY package.json yarn.lock ./
RUN yarn install

# Copy source code
COPY . .
#COPY ./index.html ./
#COPY ./src ./src
#COPY ./public ./public
#COPY ./tsconfig.json tsconfig.node.json ./
#COPY vite.config.ts ./

CMD ["yarn", "dev"]
#EXPOSE 5173





