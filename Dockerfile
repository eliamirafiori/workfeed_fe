# Use official Node image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./

# System dependencies
RUN apk add --no-cache \
    curl

# Install all packages needed to run the app
RUN npm install

# Copy source code
COPY . .

# Expose port 3000 of the docker container
EXPOSE 3000


# Start in production mode
CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "start"]