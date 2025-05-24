# Usa una imagen liviana y multi-arquitectura
FROM node:18-alpine 

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los archivos de dependencias primero (optimiza cache)
COPY package*.json ./

# Instala dependencias (usa --production si no necesitas dev deps)
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto que usas en tu backend
EXPOSE 3000

# Comando para correr la app
CMD ["node", "index.js"]
