# Use nginx to serve the pre-built React app
FROM nginx:alpine

# Copy the pre-built files from local build folder
COPY build /usr/share/nginx/html

# Copier la configuration nginx custom
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
