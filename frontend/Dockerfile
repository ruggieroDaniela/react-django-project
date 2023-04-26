# Base image
FROM node:14.18.1-alpine3.14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# COPY package*.json ./


# Copy the rest of the application code to the working directory
COPY ./ati-2-frontend .

# Install dependencies
RUN npm install

# Build the React application
# RUN npm run build

# Expose port 3000
EXPOSE 5173

# Set the start command to run the React application
CMD [ "npm", "run", "dev" ]