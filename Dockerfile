FROM node:24-bookworm-slim

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        openssl \
        python3 \
        make \
        g++ \
    && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=production
ENV DATABASE_URL="file:./data/dev.db"
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

RUN mkdir -p /app/data
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]