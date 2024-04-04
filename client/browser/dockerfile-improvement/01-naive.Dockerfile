# FOR DEMO PURPOSE. DONT DO THIS.

# Nginx server image
FROM nginx:stable-alpine3.17

# Install Node & Yarn
RUN apk add --update nodejs npm yarn
RUN npx corepack enable

WORKDIR /app

# Copying over all files
COPY . .

# Running yarn install
RUN yarn install
COPY . .

# Building static bundle
RUN yarn build

# Moving nginx config to correct directory
RUN mv ./ngingx.conf /etc/nginx/nginx.conf

# Instruct image user to map to port 5173
EXPOSE 5173

# Start container with `nginx -g daemon off`
CMD ["nginx", "-g", "daemon off;"]
