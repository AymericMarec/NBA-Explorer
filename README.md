# Projet NBA Stats

Plateforme permettant de consulter et naviguer dans les données NBA (joueurs, équipes, matchs) via l’API [balldontlie.io](http://www.balldontlie.io/), avec un système d’authentification (inscription / connexion).

Le projet est composé de deux parties :

* **nba-api/** : backend en Symfony, avec base de données PostgreSQL (gérée via Docker). Sert pour la gestion des utilisateurs (login, register).
* **website/** : frontend en Next.js, qui communique avec l’API et le backend pour l’authentification et l’affichage des données NBA.

---

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone <repo_url>
cd <repo_name>
```

### 2. Configuration des environnements

#### Backend (Symfony - `nba-api/`)

Dans `nba-api/`, remplir les variables du .env.example , et changez son nom en .env.local

#### Frontend (Next.js - `website/`)

Dans `website/`,rennomez le fichier .env.example en .env , et renseignez la clé API obtenue en créant un compte sur [balldontlie.io](http://www.balldontlie.io/).


## ⚙️ Lancer le projet

### 1. Lancer la base de données et le backend

Depuis le dossier `nba-api/` :

```bash
docker compose up -d
```
Installer les dépendances symfony :

```bash
composer install
```


Créer la base et appliquer les migrations :

```bash
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
```

Puis lancer le serveur Symfony :

```bash
symfony serve --no-tls
```

### 2. Lancer le frontend

Depuis le dossier `website/` :

```bash
npm install
npm run dev
```

👉 Le frontend sera disponible sur `http://localhost:3000`

---

## 🔑 Authentification

* **Inscription (Register)** : envoie email + mot de passe au backend (`/register`).
* **Connexion (Login)** : renvoie un token (stocké dans un cookie).
* L’accès aux pages (joueurs, équipes, matchs) nécessite d’être connecté.

---

## 📌 Fonctionnalités

* **Login / Register** : formulaire de création et connexion de compte.
* **Menu principal** : permet de naviguer entre :

  * **Joueurs** : liste des joueurs (cartes → détails du joueur + équipe).
  * **Équipes** : liste des équipes (cartes → détails + joueurs de l’équipe).
  * **Matchs** : liste des matchs (cartes → détails + équipes concernées).
* **Navigation croisée** : cliquer sur une carte (joueur, équipe, match) amène sur sa page dédiée.

---

## 🛠️ Stack technique

* **Backend** : Symfony, Doctrine ORM, PostgreSQL (via Docker).
* **Frontend** : Next.js, TypeScript.
* **Auth** : gestion des utilisateurs avec hashage de mot de passe et cookies de session.
* **API externe** : [balldontlie.io](http://www.balldontlie.io/).

---