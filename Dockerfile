FROM node:8.8.1 AS build-env

# Note: whatever you set as your WORKDIR
# should be the :2nd part of volume setting
# in docker-compose.yml

# you can also use a folder NOT in Docker
# by using MKDIR before WORKDIR
WORKDIR /usr/src/app

# This adds files into your WORKDIR
# The ./ is the root of your WORKDIR
# Note: files that are ADDED are not able to be modified afterwards
# without re-building
COPY app/package.json app/package-lock.json ./

# no volumes on this version, copy the app files over to
# your WORKDIR
COPY app/server.js app/http-server.js ./

RUN npm install
RUN npm install nodemon -g

# https
EXPOSE 443

# runs what the start script is in package.json
CMD ["nodemon", "server.js"]