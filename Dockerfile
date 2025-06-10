# Build stage for frontend
FROM node:18 as frontend-builder
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Backend stage
FROM node:18
WORKDIR /app

# Copy backend files
COPY server/package.json server/package-lock.json ./
RUN npm install --production
COPY server/ .

# Copy built frontend
COPY --from=frontend-builder /app/build ./public

# Environment variables - these are defaults that will be overridden
ENV NODE_ENV=production
ENV PORT=5000
ENV DB_HOST=mysql
ENV DB_USER=default_user
ENV DB_PASSWORD=default_password
ENV DB_NAME=default_db

EXPOSE 5000
CMD ["node", "index.js"]