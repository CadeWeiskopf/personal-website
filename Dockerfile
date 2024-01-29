FROM node:18-alpine as build
WORKDIR /app
COPY . .
RUN apk update && apk upgrade && npm install && npm run build
USER node

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# COPY ./certs/cadew.dev.crt /etc/nginx/ssl/
# COPY ./certs/cadew.dev.key /etc/nginx/ssl/
# RUN chmod 600 /etc/nginx/ssl/cadew.dev.crt /etc/nginx/ssl/cadew.dev.key
# COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
# EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]