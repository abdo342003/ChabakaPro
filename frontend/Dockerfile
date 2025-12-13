# Stage 1: Build the React app
FROM node:18-alpine AS build

WORKDIR /app

# Build arguments
ARG REACT_APP_API_URL
ARG REACT_APP_WHATSAPP_NUMBER
ARG REACT_APP_PHONE_NUMBER
ARG REACT_APP_EMAIL

# Set environment variables
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_WHATSAPP_NUMBER=$REACT_APP_WHATSAPP_NUMBER
ENV REACT_APP_PHONE_NUMBER=$REACT_APP_PHONE_NUMBER
ENV REACT_APP_EMAIL=$REACT_APP_EMAIL

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
