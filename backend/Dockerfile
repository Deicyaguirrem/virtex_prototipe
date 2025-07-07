# Usa una imagen base de Node.js
FROM node:18

# Crea y define el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto (si aplica)
EXPOSE 3000

# Comando para iniciar la app
CMD ["./wait-for-it.sh", "db:5432", "--", "node", "index.js"]

