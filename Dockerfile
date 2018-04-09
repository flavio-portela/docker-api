# Define our base image
FROM node:9.11

# Set the working directory
WORKDIR /code

# Copy our code into the container
ADD . .

# Install the dependecies
RUN npm install nodemon -g
RUN npm install && npm ls

# Expose the ports
EXPOSE 3000
EXPOSE 5858

# Start the app
CMD npm run start-dev