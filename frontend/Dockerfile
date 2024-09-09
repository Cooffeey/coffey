# Use an official node image as a parent image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the current directory contents into the container
COPY . /app

# Install dependencies
RUN npm install

# Build the React app
RUN npm run build

# Install a simple web server to serve the built app
RUN npm install -g serve

# Set the command to start the server
CMD ["serve", "-s", "build"]

# Expose the port the app runs on
EXPOSE 3000
