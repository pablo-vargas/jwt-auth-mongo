FROM node:20 AS build
ADD . /app
WORKDIR /app
RUN npm install && npm run build && npm prune --production
USER node

FROM node:20-alpine AS deploy
ENV NODE_ENV production
ENV SERVER_HOST 0.0.0.0
RUN mkdir -p /app/node_modules
RUN mkdir -p /app/dist
COPY --chown=node:node --from=build /app/node_modules ./app/node_modules
COPY --chown=node:node --from=build /app/dist ./app/dist
COPY --chown=node:node --from=build /app/.env ./app/

EXPOSE 3000
EXPOSE 3001

WORKDIR /app
CMD [ "node", "dist/main.js" ]