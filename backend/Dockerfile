FROM node:18-alpine

WORKDIR /usr/src/app

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances (incluant nodemon)
RUN npm install && npm install -g nodemon

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 5000

# Démarrer l'application avec nodemon pour auto-reload
CMD ["nodemon", "src/server.js"]
