# Use a lightweight Nginx image
FROM nginx:alpine

# Copy all local files to the Nginx html directory
COPY . /usr/share/nginx/html

# Cloud Run expects the app to listen on port 8080 by default.
# We modify the default Nginx config to listen on 8080 instead of 80.
RUN sed -i 's/listen  *80;/listen 8080;/' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
