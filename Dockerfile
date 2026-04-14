FROM nginx:alpine

# Remove default nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy site files
COPY index.html /usr/share/nginx/html/
COPY css/ /usr/share/nginx/html/css/
COPY js/ /usr/share/nginx/html/js/
COPY assets/ /usr/share/nginx/html/assets/
COPY logos/ /usr/share/nginx/html/logos/
COPY "Yesbellis and the Spells Songs/" "/usr/share/nginx/html/Yesbellis and the Spells Songs/"

EXPOSE 3002
