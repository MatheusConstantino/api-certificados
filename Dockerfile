#Build Stage
FROM node:18-alpine3.15 as build-stage

RUN mkdir -p /home/node/app/

WORKDIR /home/node/app

COPY package.json ./

COPY . .

# RUN rm ./prisma/schema.prisma

# COPY ./database/schema.prisma ./prisma/schema.prisma

RUN npm install

# RUN npx prisma db pull

RUN npx prisma generate

#Production Stage
FROM nginx:stable-alpine as production-stage

ENV APP_HOME=/home/node/app

ENV SERVER_HOME=/usr/share/nginx/html

COPY --from=build-stage $APP_HOME/ $SERVER_HOME/

COPY --from=build-stage $APP_HOME/.env $SERVER_HOME

RUN apk add --update nodejs npm

RUN chown nginx:nginx $SERVER_HOME

WORKDIR $SERVER_HOME

EXPOSE 3333

CMD ["npm", "run", "dev"]