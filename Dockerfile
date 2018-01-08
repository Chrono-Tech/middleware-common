FROM node:8.1


RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install
RUN npm install -g pm2
COPY . /usr/src/app
EXPOSE 8080
CMD pm2-docker start /mnt/config/${NETWORK_TYPE}/ecosystem.config.js