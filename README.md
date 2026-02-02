# RED PRODUCT – Frontend

##  Description
Ce dépôt contient la partie **frontend** de l’application RED PRODUCT.
Il s’agit d’une interface web moderne permettant aux administrateurs
d’interagir avec la plateforme de gestion hôtelière via un tableau de bord.

Le frontend consomme une API REST sécurisée développée avec Django.

---

##  Technologies utilisées
- React (Vite)
- React Router DOM
- Tailwind CSS
- React Icons
- Fetch API (client HTTP personnalisé)

---

##  Fonctionnalités
- Authentification utilisateur (connexion / déconnexion)
- Activation de compte par email
- Réinitialisation du mot de passe
- Tableau de bord administrateur
- Sidebar et Topbar dynamiques
- Interface responsive (desktop et mobile)

---

##  Structure du projet

src/
│── components/
│ ├── layout/ (Sidebar, Topbar)
│ └── hotels/
│
│── pages/
│ ├── auth/ (login, register, activation, reset password)
│ ├── dashboard/
│ └── hotels/
│
│── services/
│ ├── apiClient.js
│ └── authApi.js
│
│── context/
│ └── SearchContext.jsx
│
│── layouts/
│ └── AdminLayout.jsx


---

##  Gestion de l’authentification
- Authentification basée sur JWT
- Token stocké côté client (`localStorage`)
- Récupération automatique de l’utilisateur connecté via `/me`
- Protection des routes privées via layout

---

##  Variables d’environnement

Créer un fichier `.env` à la racine :

```env
VITE_API_URL= https://red-product-backend-eymz.onrender.com

## Installation et lancement
npm install
npm run dev
L’application sera accessible sur : http://localhost:5173
## Backend
Ce frontend communique avec l’API backend disponible ici :
 Repo Backend : https://github.com/ColleFALL/red_product_backend.git


## Contexte

Projet réalisé dans le cadre d’un stage de fin de formation
Objectif : concevoir une interface utilisateur moderne, sécurisée et maintenable.
























