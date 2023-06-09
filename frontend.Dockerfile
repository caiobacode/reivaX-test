FROM node:14-alpine
EXPOSE 3000

COPY ./frontend /usr/src/app
WORKDIR /usr/src/app
RUN npm install
CMD ["npm", "start"]