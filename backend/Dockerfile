FROM node:20-alpine AS builder
WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /backend

COPY --from=builder /backend/dist ./dist
COPY package*.json ./
RUN npm install --production

EXPOSE 5000

CMD ["node", "dist/server.js"]
