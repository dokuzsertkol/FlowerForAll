FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
RUN npm install -g serve

EXPOSE 5173
CMD ["serve", "-s", "dist", "-l", "5173"]

