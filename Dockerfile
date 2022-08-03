FROM node:16 AS frontend

WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install

COPY . /frontend
RUN npm run dev

FROM nginx:latest
COPY --from=frontend /frontend/dist/ /usr/share/nginx/html
