FROM node:carbon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80 443
ENV PORT 80
CMD [ "npm", "start" ]
