FROM node:20-bookworm-slim AS base

WORKDIR /app

ENV PNPM_HOME="/usr/local/share/pnpm" \
    PATH="$PNPM_HOME:$PATH" \
    NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

COPY package.json pnpm-lock.yaml ./
COPY patches ./patches

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
