FROM node:8-slim
ENV NPM_CONFIG_LOGLEVEL warn
RUN apt update && \
    apt install -y python make g++ git build-essential && \
    npm install -g pm2@2.7.1 && \
    mkdir /app
WORKDIR /app
RUN git clone https://github.com/ChronoBank/middleware-common.git src
RUN cd src && npm install
EXPOSE 8080
CMD pm2-docker start /mnt/config/middleware-common/ecosystem.config.js