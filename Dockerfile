FROM node AS base

WORKDIR /code/
COPY . /code/
RUN npm install -g
RUN npm run build

CMD [ "npm", "run", "start" ]
