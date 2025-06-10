# Build frontend
FROM node:18 as frontend-builder
WORKDIR /app
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client .
RUN npm run build

# Setup backend
FROM node:18
WORKDIR /app
COPY server/package.json server/package-lock.json ./
RUN npm install --production
COPY server .

# Copy built frontend
COPY --from=frontend-builder /app/build ./public

# Environment variables
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000
CMD ["node", "index.js"]