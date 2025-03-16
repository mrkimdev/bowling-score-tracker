FROM node:22-alpine AS base
FROM base AS sourcer
RUN apk update
WORKDIR /app
COPY . .
RUN npx turbo@v2.4.4 prune --scope=api --docker

FROM base AS installer
RUN apk update
WORKDIR /app
COPY --from=sourcer /app/out/json/ .
COPY --from=sourcer /app/out/package-lock.json ./package-lock.json
COPY --from=sourcer /app/turbo.json ./turbo.json
COPY --from=sourcer /app/apps/api/prisma ./prisma
RUN npm ci
RUN npx prisma generate 


FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=sourcer /app/out/full/ .
RUN npx turbo@v2.4.4 run build

FROM base AS runner
WORKDIR /app
COPY --from=builder /app/ .
CMD [ "node", "apps/api/dist/main.js" ]