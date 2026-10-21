FROM node:18-alpine

WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies cleanly
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables for production
ENV MONGO=mongodb://localhost:27017/hs_computer_certification
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]