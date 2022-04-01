FROM node:10 AS node

RUN mkdir /home/app
RUN mkdir /tmp/bpmn_editor
WORKDIR /tmp/bpmn_editor

COPY app/ ./app
COPY resources/ ./resources
COPY package.json .
COPY package-lock.json .
COPY webpack.config.js .
COPY README.md .

RUN npm install -g http-server \
    && npm install \
    && npm run build \
    && cp -r ./public/* /home/app/

FROM nginx:1.13.9-alpine

COPY --from=node /tmp/bpmn_editor/public /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]