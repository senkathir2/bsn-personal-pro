FROM node:20 as build-satge

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app/

RUN npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-satge /app/dist/book-network-ui /usr/share/nginx/html

EXPOSE 80