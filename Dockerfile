FROM node:latest

WORKDIR /usr/src/portals-suite

COPY . .
RUN npm install

EXPOSE 8080 9901

CMD ["npm", "run", "dev"]