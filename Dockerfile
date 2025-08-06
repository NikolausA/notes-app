FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html


COPY nginx.config /etc/nginx/conf.d/default.conf

RUN mkdir -p /var/www/certbot

EXPOSE 80 443

CMD [ "nginx", "-g", "daemon off;" ]