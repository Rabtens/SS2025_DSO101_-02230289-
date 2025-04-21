# Use an appropriate base image for your application
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose port (if applicable)
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]