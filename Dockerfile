FROM node AS base

WORKDIR /code/
COPY . /code/
RUN npm install .
RUN npm run build

CMD npm run start
