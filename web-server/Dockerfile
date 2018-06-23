FROM node:carbon
WORKDIR /app
COPY COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80 443
CMD [ "npm", "start" ]
