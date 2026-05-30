#use the offical node.js image
FROM node:24

#set the working directory in the container
WORKDIR /usr/src/app

COPY package.json ./
RUN npm install

#copy the rest of the application code to the container
COPY . .

#expose the port that the application will run on
EXPOSE 5000

CMD [ "npm", "start" ]