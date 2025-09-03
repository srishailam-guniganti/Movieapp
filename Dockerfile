# Step 1: Build the React app
FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Step 2: Serve the build with Nginx
FROM nginx:stable-alpine

# Copy built React files to Nginx’s web directory
COPY --from=build /app/build /usr/share/nginx/html

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config (optional)
# COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
