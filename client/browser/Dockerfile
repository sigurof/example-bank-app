
FROM node:20.11.1-alpine3.18 AS base
WORKDIR /app

COPY package.json .yarnrc.yml yarn.lock .pnp.cjs .pnp.loader.mjs ./
COPY .yarn/ ./.yarn
RUN yarn install

COPY . .
EXPOSE 5173

CMD ["yarn", "vite"]





