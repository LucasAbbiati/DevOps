FROM node:14 AS build-stage
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build
FROM nginx:alpine AS production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
#FROM node:14
#WORKDIR /app
#COPY . /app/
#RUN npm install
#EXPOSE 3000
#CMD ["npm", "start"]
