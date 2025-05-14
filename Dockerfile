
FROM oven/bun:1.1-alpine AS base
WORKDIR /app
COPY . .
ENV HUSKY=0
RUN bun install


###############################################################################
# CleanIAM - Builder
###############################################################################

FROM base AS cleaniam-app-builder
WORKDIR /app
RUN bun run build

###############################################################################
# CleanIAM - App
###############################################################################

FROM nginx:alpine AS cleaniam-app
# Copy your custom Nginx configuration file to the container
COPY --from=base /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=cleaniam-app-builder /app/dist/ /app
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]