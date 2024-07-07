FROM phpmyadmin/phpmyadmin:latest

# Ajouter une commande pour définir ServerName dans la configuration d'Apache
RUN echo 'ServerName ${DB_HOST}' >> /etc/apache2/apache2.conf && apache2-foreground