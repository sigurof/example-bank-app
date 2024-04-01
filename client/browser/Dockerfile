# Starting from a Docker image with yarn installed
FROM node:20.11.1-alpine3.18 AS base
WORKDIR /app

# Copying over all files that yarn uses for caching
COPY package.json .yarnrc.yml yarn.lock .pnp.cjs .pnp.loader.mjs ./
COPY .yarn/ ./.yarn

# Running yarn install (should be quite quick)
RUN yarn install
COPY . .

FROM base AS dev
# Copying over the other source files, like src/, index.html, vite config, TS config etc.
EXPOSE 5173

# Starting the dev server
CMD ["yarn", "vite"]

FROM base AS dist-build

RUN yarn build

FROM nginx:stable-alpine3.17 AS dist

COPY --from=dist-build /app/dist /app/dist

COPY ./ngingx.conf /etc/nginx/nginx.conf

EXPOSE 5173

USER nginx

CMD ["nginx", "-g", "daemon off;"]
