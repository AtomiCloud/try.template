FROM oven/bun:1.2-alpine AS build
WORKDIR /app
# Install dependencies first for better layer caching. The lockfile is optional
# (the server has no third-party deps yet), so fall back to a plain install.
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile || bun install
COPY . .

FROM oven/bun:1.2-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=build /app .
EXPOSE 3000
USER bun
CMD ["bun", "run", "src/server.ts"]
