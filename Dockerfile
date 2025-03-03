# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the package.json files
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine AS runner

# Set the working directory
WORKDIR /app

# Copy package.json files for production
COPY package*.json ./

# Install only production dependencies
RUN npm install --production --frozen-lockfile

# Copy built files from the build stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./

# Expose port 3000
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start the Next.js app
CMD ["npm", "start"]