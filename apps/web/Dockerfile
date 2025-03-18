
FROM node:22-alpine AS base

FROM base AS sourcer
WORKDIR /app
COPY . .
RUN npx turbo@v2.4.4 prune --scope=web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=sourcer /app/out/json/ .
COPY --from=sourcer /app/out/package-lock.json ./package-lock.json
COPY --from=sourcer /app/turbo.json ./turbo.json
RUN npm ci

FROM base AS builder
WORKDIR /app
ARG NODE_ENV=production
ARG NEXT_PUBLIC_APP_VERSION
ENV NEXT_PUBLIC_APP_VERSION=$NEXT_PUBLIC_APP_VERSION
ARG NEXT_PUBLIC_CLIENT_API_URL
ENV NEXT_PUBLIC_CLIENT_API_URL=$NEXT_PUBLIC_CLIENT_API_URL
COPY --from=installer /app/ .
COPY --from=sourcer /app/out/full/ .
RUN npx turbo@v2.4.4 run build

FROM nginx:stable-alpine AS runner
COPY --from=builder /app/apps/web/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
