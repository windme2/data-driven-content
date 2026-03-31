# Use official Node.js Alpine image for a smaller footprint
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build TypeScript to JavaScript
RUN npm run build

# Expose API port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
