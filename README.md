# InService

## Des services plus proches de vous

InService est une application web de mise en relation entre des clients et des techniciens.

La plateforme permet aux clients de rechercher des services, consulter les techniciens disponibles, envoyer des demandes et gérer leurs techniciens favoris.

Les techniciens disposent d'un espace dédié leur permettant de gérer leurs services, leurs demandes, leur disponibilité et leurs messages.

---

## Table des matières

- [Présentation](#présentation)
- [Objectifs du projet](#objectifs-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Architecture du projet](#architecture-du-projet)
- [Base de données](#base-de-données)
- [Diagrammes](#diagrammes)
- [Maquettes](#maquettes)
- [Installation](#installation)
- [Lancement du projet](#lancement-du-projet)
- [Auteur](#auteur)

---

## Présentation

InService est une plateforme web conçue pour faciliter la mise en relation entre les clients qui recherchent un service et les techniciens qui proposent leurs prestations.

L'application contient deux types principaux d'utilisateurs :

- Client
- Technicien

Le client peut rechercher des prestations et contacter des techniciens selon ses besoins.

Le technicien peut publier et gérer ses services depuis son espace personnel.

---

## Objectifs du projet

Les principaux objectifs d'InService sont :

- Faciliter la recherche de techniciens.
- Regrouper plusieurs catégories de services sur une seule plateforme.
- Permettre aux techniciens de présenter leurs prestations.
- Simplifier l'envoi et la gestion des demandes de service.
- Permettre aux clients de sauvegarder leurs techniciens favoris.
- Faciliter la communication entre les utilisateurs.
- Permettre aux techniciens de gérer leur disponibilité.
- Proposer une interface moderne, simple et responsive.

---

## Fonctionnalités

### Client

Le client peut :

- Créer un compte.
- Se connecter.
- Se déconnecter.
- Consulter les services disponibles.
- Rechercher une prestation.
- Consulter les différentes catégories.
- Consulter les informations des techniciens.
- Envoyer une demande de service.
- Consulter ses demandes.
- Ajouter un technicien aux favoris.
- Supprimer un technicien des favoris.
- Consulter ses techniciens favoris.
- Gérer son profil.

### Technicien

Le technicien peut :

- Créer un compte.
- Se connecter.
- Se déconnecter.
- Accéder à son tableau de bord.
- Ajouter un service.
- Modifier un service.
- Supprimer un service.
- Associer un service à une catégorie.
- Consulter ses prestations.
- Rechercher parmi ses services.
- Consulter les demandes reçues.
- Gérer les demandes des clients.
- Gérer sa disponibilité.
- Consulter ses messages.
- Gérer son profil.

---

## Catégories de services

L'application permet d'organiser les prestations par catégories.

Exemples :

- Plomberie et Sanitaire
- Électricité et Éclairage
- Climatisation et Chauffage
- Peinture et Décoration
- Menuiserie et Boiserie
- Serrurerie et Sécurité
- Maçonnerie et Rénovation
- Réparation Électroménager
- Informatique et Réseaux
- Jardinage et Extérieur
- Nettoyage et Entretien
- Déménagement et Transport
- Sécurité et Alarme
- Mécanique et Auto-Moto

Chaque catégorie peut contenir :

- Un nom
- Une icône
- Une image

---

## Technologies utilisées

### Front-end

- React.js
- Vite
- JavaScript
- Tailwind CSS
- React Router DOM
- Axios
- Lucide React

### Back-end

- Laravel
- PHP
- REST API

### Base de données

- MySQL

### Outils de développement

- Visual Studio Code
- Git
- GitHub
- Postman
- Figma
- Google Stitch

---

## Architecture du projet

Le projet est organisé principalement en deux parties :


InService/
│
├── backend/
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   ├── Models/
│   │   └── ...
│   │
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   │
│   ├── routes/
│   │   └── api.php
│   │
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   └── ...
│
├── docs/
│   ├── diagrams/
│   └── maquettes/
│
└── README.md

Le front-end React communique avec le back-end Laravel à travers une API REST.

React
  |
  | HTTP / Axios
  |
Laravel API
  |
Controllers
  |
Models
  |
MySQL
Base de données

L'application utilise une base de données relationnelle MySQL.

Les principales entités du projet sont :

User
Client
Technicien
Category
Service
ServiceRequest
Favorite
Message

Ces entités permettent de gérer les utilisateurs, les prestations, les catégories, les demandes, les favoris et les échanges entre les utilisateurs.

Diagrammes

Les diagrammes du projet sont stockés dans le dossier :

docs/
└── diagrams/
    ├── use-case-diagram.png
    ├── class-diagram.png
    └── erd.png
Diagramme de cas d'utilisation

Le diagramme de cas d'utilisation représente les interactions entre les différents acteurs et l'application.

Les acteurs principaux sont :

Client
Technicien

Diagramme de classes

Le diagramme de classes représente les principales classes du système ainsi que leurs relations.

Il contient notamment :

User
Client
Technicien
Category
Service
ServiceRequest
Favorite
Message

Diagramme ERD

Le diagramme ERD représente la structure de la base de données ainsi que les relations entre les différentes tables.

Maquettes

Les maquettes de l'application permettent de représenter les différentes interfaces avant ou pendant leur développement.

Les maquettes peuvent être stockées dans :

docs/
└── maquettes/
    ├── home.png
    ├── login.png
    ├── register.png
    ├── client-dashboard.png
    ├── technicien-dashboard.png
    ├── services.png
    ├── demandes.png
    └── favoris.png
Aperçu de la maquette

Authentification

L'application dispose d'un système d'authentification permettant aux utilisateurs d'accéder à leur espace.

Après la connexion, l'utilisateur accède à l'interface correspondant à son rôle.

Utilisateur
     |
     v
Authentification
     |
     +-------------------+
     |                   |
     v                   v
   Client            Technicien
     |                   |
     v                   v
Espace Client      Espace Technicien
Gestion des services

Les techniciens peuvent créer et gérer leurs propres prestations.

Un service contient notamment :

Service
|
+-- Titre
+-- Description
+-- Prix
+-- Catégorie
+-- Technicien

Chaque service est associé à une catégorie.

Les informations de la catégorie peuvent être utilisées pour afficher :

Le nom de la catégorie
Son image
Son icône
Gestion des demandes

Un client peut envoyer une demande de service à un technicien.

Le technicien peut ensuite consulter les demandes reçues depuis son espace.

Ce système permet de centraliser les demandes de service entre les clients et les techniciens.

Gestion des favoris

Le système de favoris permet au client de sauvegarder les techniciens qui l'intéressent.

Client
   |
   | ajoute aux favoris
   |
   v
Technicien

Le client peut ensuite consulter ou supprimer ses techniciens favoris.

Messagerie

L'application possède un espace permettant de gérer les échanges liés aux prestations.

Le technicien dispose notamment d'une interface dédiée à la consultation de ses messages.

Gestion de la disponibilité

Le technicien peut gérer sa disponibilité.

Cette information permet de déterminer si ses prestations peuvent être proposées aux clients.

Interface utilisateur

L'application utilise une identité visuelle moderne basée principalement sur les couleurs suivantes :

Dark Green : #0D1F1A
Emerald    : couleur principale d'accentuation
Background : #F5F7F6
Cards      : White

L'interface utilise notamment :

Une Sidebar
Une Navbar
Des cartes pour afficher les informations
Des images pour les catégories
Des formulaires
Des fenêtres modales
Une interface responsive
Responsive Design

L'interface est conçue pour s'adapter à plusieurs tailles d'écran :

Desktop
Tablette
Mobile

La disposition des éléments et la navigation s'adaptent automatiquement selon la taille de l'écran.

Installation
Prérequis

Avant de lancer le projet, il faut installer :

PHP
Composer
Node.js
npm
MySQL
Git
Cloner le projet
git clone <URL_DU_REPOSITORY>

Accéder au projet :

cd InService
Installation du Back-end

Accéder au dossier backend :

cd backend

Installer les dépendances :

composer install

Créer le fichier .env :

cp .env.example .env

Générer la clé Laravel :

php artisan key:generate

Configurer la base de données dans .env :

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=inservice
DB_USERNAME=root
DB_PASSWORD=

Exécuter les migrations :

php artisan migrate

Exécuter les seeders si nécessaire :

php artisan db:seed

Ou recréer complètement la base de données :

php artisan migrate:fresh --seed

Lancer le serveur Laravel :

php artisan serve

Le serveur back-end sera généralement disponible à l'adresse :

http://127.0.0.1:8000
Installation du Front-end

Ouvrir un deuxième terminal puis accéder au dossier frontend :

cd frontend

Installer les dépendances :

npm install

Lancer le serveur de développement :

npm run dev

Vite affichera l'adresse du front-end dans le terminal.

API

Le front-end communique avec Laravel à travers une API REST.

Les principales ressources de l'API concernent :

Authentification
Utilisateurs
Clients
Techniciens
Catégories
Services
Demandes
Favoris
Messages
Disponibilités
Git et GitHub

Git est utilisé pour gérer les versions du projet.

Exemple :

git add .
git commit -m "Update InService"
git push

GitHub permet de stocker le code source du projet et de suivre son évolution.

Structure de la documentation

Pour garder le repository organisé :

InService/
│
├── backend/
│
├── frontend/
│
├── docs/
│   │
│   ├── diagrams/
│   │   ├── use-case-diagram.png
│   │   ├── class-diagram.png
│   │   └── erd.png
│   │
│   └── maquettes/
│       ├── home.png
│       ├── login.png
│       ├── register.png
│       ├── client-dashboard.png
│       └── technicien-dashboard.png
│
└── README.md
Améliorations futures

Plusieurs fonctionnalités pourront être ajoutées dans de futures versions :

Notifications en temps réel
Système d'évaluation
Avis clients
Géolocalisation
Paiement en ligne
Recherche avancée
Filtres supplémentaires
Historique avancé des prestations
Auteur

Salah Eddine Tabit

Projet réalisé dans le cadre d'un projet de développement Full-Stack.

Technologies principales :

Laravel - React - MySQL - Tailwind CSS

Licence

Ce projet a été réalisé à des fins pédagogiques.

<img width="681" height="443" alt="diagramme USECASE" src="https://github.com/user-attachments/assets/f52b3837-3901-4317-a5ce-ef60886252e0" />
<img width="683" height="403" alt="diagramme ERD" src="https://github.com/user-attachments/assets/16137091-533b-4bb5-8c9c-9e6cb426a743" />
<img width="551" height="464" alt="diagramme de classe " src="https://github.com/user-attachments/assets/fdb53f94-97b4-4869-864f-cdce7b1b3e5a" />


