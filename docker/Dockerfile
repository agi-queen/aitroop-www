# ─────────────────────────────────────────────────────────────
#  aitroop-home  —  pure frontend static build
#
#  Build:
#    bash docker/build.sh
# ─────────────────────────────────────────────────────────────

# ── Stage 1: Build frontend ────────────────────────────────────
FROM node:22-alpine AS frontend
WORKDIR /src
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npx vite build

# ── Stage 2: Serve with nginx ──────────────────────────────────
FROM nginx:alpine
COPY --from=frontend /src/dist /usr/share/nginx/html
# SPA fallback: all routes serve index.html
RUN printf 'server {\n  listen 8080;\n  root /usr/share/nginx/html;\n  index index.html;\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n' \
    > /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
