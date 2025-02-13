# Imagen base de Node.js para construir el frontend
FROM node:18 AS build

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar los archivos del frontend
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen ligera de Nginx para servir el frontend
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
