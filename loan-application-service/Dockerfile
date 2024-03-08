# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Instalar bcrypt y compilarlo
RUN npm install bcrypt

# Instalar @nestjs/passport
RUN npm install @nestjs/passport

# Instalar passport-jwt
RUN npm install passport-jwt

# Copiar el resto de los archivos de la aplicación
COPY . .

# Compilar los archivos TypeScript en JavaScript
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "dist/main"]