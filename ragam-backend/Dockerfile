# Stage 1: Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --include=dev

COPY . .

RUN npx prisma generate

FROM node:18-alpine

WORKDIR /app

# Copy only production files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src 

# Set environment variables
ENV NODE_ENV=production
ENV PORT=8080 

EXPOSE 8080

# Start the app
CMD ["npm", "start"]