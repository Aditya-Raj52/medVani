# Multi-stage Dockerfile for MedVani

# Stage 1: Build static web assets
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install dependencies cleanly
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps

# Copy full application code
COPY . .

# Build Vite web production bundle
RUN npm run build

# Stage 2: Serve with high-performance Nginx web server
FROM nginx:alpine AS runner

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy production static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
