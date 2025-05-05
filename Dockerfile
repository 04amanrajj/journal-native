# Use an official Node.js LTS image as the base (matches React Native/Expo requirements)
FROM node:22-slim

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install production dependencies
RUN npm install --omit=dev && npm cache clean --force


# Install Expo CLI globally
RUN npm install -g expo-cli

# Copy the rest of the project files
COPY . .

# Expose port 19000 for Expo dev server
EXPOSE 19000

# Default command to start the Expo development server
CMD ["npx", "expo", "start", "--tunnel"]