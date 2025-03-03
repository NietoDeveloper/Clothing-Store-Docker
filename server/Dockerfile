FROM node:16
WORKDIR /app
COPY package.json .
RUN npm i
COPY . . 

ARG PORT
ENV PORT ${PORT}
EXPOSE ${PORT}
CMD node server.js ${PORT}
