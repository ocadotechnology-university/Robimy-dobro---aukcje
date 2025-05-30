FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install && npm cache clean --force

COPY . ./
RUN npm run build

FROM node:18-alpine AS development
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile && npm cache clean --force

COPY . ./

EXPOSE 3000
CMD ["npm", "start"]

FROM nginx:alpine AS production

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]