# Base image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the rest of the application code to the working directory
COPY ./ati-2-frontend .

# Install dependencies
RUN npm install

# Exclude the node_modules folder from the volume
VOLUME [ "/app", "/app/node_modules" ]
# Build the React application
# RUN npm run build

# Expose port 3000
EXPOSE 5173

# Set the start command to run the React application
CMD [ "npm", "run", "dev" ]