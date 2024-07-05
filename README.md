# GRINEASY API 👮​

![Static Badge](https://img.shields.io/badge/MDS_PROJET-v.1.0.0-red)
![Static Badge](https://img.shields.io/badge/Group-Amethyste-884DA7)
![Static Badge](https://img.shields.io/badge/REACT-blue?logo=react)
![Static Badge](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss)

## Description 📖​

GrinEasy est une application développée avec Node.js, Express et Sequelize qui offre une plateforme de services aux entreprises souhaitant améliorer l'environnement de travail de leurs employés.

## Caractéristiques principales ⚡​

    - Mettre en place un système d'authentification pour sécuriser l'accès à l'API.
    - Définir des rôles et des autorisations pour les différents types d'utilisateurs (administrateurs, entreprises, Happiness Officers).
    - Jounal de bord émotionnel
    - Chat en ligne avec un Happiness Officer

Cette API est conçue pour faciliter la collaboration entre les entreprises et les experts du bien-être au travail, afin de créer des environnements de travail plus heureux et épanouissants pour les employés.

## Installation 🚀​

Pour installer et exécuter ce projet localement, suivez ces étapes :

```bash
git clone https://github.com/remimoul/api-mds.git
cd api-mds
npm install
npm start
```

## 💁‍♂️​➡️​ Configuration des variable d'environnement ⬅️​

Certaines variables d'environnement doivent être configurées pour faire fonctionner correctement l'application. Créez un fichier .env à la racine du projet et ajoutez les variables suivantes :

```bash
JWT_KEY=<votreclésecrete>
STREAM_CHAT_API_KEY=<votreclésecrete>
STREAM_CHAT_API_SECRET=<votreclésecrete>
DB_HOST=<adresse_de_la_base_de_données>
DB_NAME=<nom_de_la_base>
DB_LOGIN=<login_de_votre_base>
DB_PASSWORD=<mot_de_passe_db>
HOST=
PORT=
```

Exemple remplacez <adresse_de_la_base_de_données> et <mot_de_passe_db> par les informations de votre base de données.

## 👩‍🚀​ Exécution de l'application avec Docker 🚀​🔥​

Une fois les variables d'environnement renseigné, vous pouvez lancer l'application en utilisant la commande suivante :

```bash
docker-compose up -d
```

Si vous prévoyez de laisser le .env à la racine, ce que je recommande, car cela fonctionnera aussi en local :

```bash
docker-compose --env-file ../.env up -d
```

## Bibliothèques utilisées 📚

Ce projet utilise les bibliothèques suivantes :

## Contact 📲

Si vous souhaitez me contacter, vous pouvez m'envoyer un email à [votre email](mailto:remi.moul@my-digital-school.org).
