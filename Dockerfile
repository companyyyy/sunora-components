# Builds the static export, then serves it with nginx.
# The server's reverse proxy forwards sunoracomponents.eu to this container.

FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# Inlined into the pages at build time.
ARG NEXT_PUBLIC_SITE_URL=https://sunoracomponents.eu
ARG NEXT_PUBLIC_FORM_ENDPOINT=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_FORM_ENDPOINT=$NEXT_PUBLIC_FORM_ENDPOINT \
    NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM nginx:1.27-alpine
COPY deploy/nginx/site.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO /dev/null http://127.0.0.1/en/ || exit 1
