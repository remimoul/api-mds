FROM phpmyadmin/phpmyadmin:latest

# Ajouter une commande pour définir ServerName dans la configuration d'Apache
RUN echo 'ServerName localhost' >> /etc/apache2/apache2.conf

CMD ["apache2-foreground"]