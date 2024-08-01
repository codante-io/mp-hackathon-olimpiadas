FROM node:18-alpine

WORKDIR /api

COPY . .

RUN npm rebuild \
  ; touch newrelic_agent.log && chmod 777 newrelic_agent.log

USER node

CMD ["node", "dist/app/index.js"]