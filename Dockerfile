# Contrat VibeLab : multi-stage, port interne 3000, USER non-root, HEALTHCHECK
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json ./
COPY server.js ./
COPY public/ ./public/

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app .
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
USER node
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:3000/healthz || exit 1
CMD ["node", "server.js"]
