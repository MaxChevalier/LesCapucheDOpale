FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-audit --no-fund && npm install -g http-server && npm install -g @angular/cli
COPY . .
RUN npm run build -- --configuration production
EXPOSE 4200
CMD ["http-server", "dist/opal-project/browser", "-p", "4200"]