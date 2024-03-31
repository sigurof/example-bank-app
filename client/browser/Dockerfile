# Starting from a Docker image with yarn installed
FROM node:20.11.1-alpine3.18 AS base
WORKDIR /app

# Copying over all files that yarn uses for caching
COPY package.json .yarnrc.yml yarn.lock .pnp.cjs .pnp.loader.mjs ./
COPY .yarn/ ./.yarn

# Running yarn install (should be quite quick)
RUN yarn install

# Copying over the other source files, like src/, index.html, vite config, TS config etc.
COPY . .
EXPOSE 5173

# Starting the dev server
CMD ["yarn", "vite"]





