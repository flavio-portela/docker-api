# Define our base image
FROM node:9.11

# Set the working directory
WORKDIR /code

# Install the dependecies
COPY package.json .
COPY package-lock.json .
RUN npm install nodemon -g
RUN npm install && npm ls

# Copy our code into the container
COPY . .

# Expose the ports
EXPOSE 3000
EXPOSE 5858

# Start the app
CMD npm run start-dev