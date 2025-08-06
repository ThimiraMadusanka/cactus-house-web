FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

# Accept build-time environment variable
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

COPY . .

RUN npm run build

##

FROM node:20-slim AS production

WORKDIR /app

COPY --from=builder /app/public ./public

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

CMD ["node", "server.js"]
