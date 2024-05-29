# Use Node.js base image
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the server
CMD ["npm", "start"]
