#  Plateforme de recherche et de mise en relation de profils

## Présentation du projet

Ce projet est une **API backend open source** dont l’objectif est de rendre visibles des profils compétents, dans la tech comme hors tech, qui ne le sont pas suffisamment sur les réseaux professionnels classiques.

Il s’agit d’une **base de données centralisée de profils**, accessible uniquement via une API REST, permettant :

* la gestion de profils structurés
* la recherche avancée multicritère
* l’accès direct à un moyen de contact
* la consultation du statut de disponibilité

 **Aucune interface utilisateur n’est prévue dans cette première phase**. Le projet est volontairement backend-first.

---

##  Objectifs du backend

L’API vise à être :

* robuste
* claire
* évolutive
* professionnelle

Elle doit permettre :

* la création, consultation, modification et suppression de profils
* une recherche avancée avec filtres combinables
* une architecture propre et maintenable
* une documentation claire pour les contributeurs et utilisateurs

---

##  Périmètre du projet

### ✅ Inclus

* API REST backend
* Gestion complète des profils
* Recherche avancée multicritère
* Pagination des résultats
* Stockage et structuration des données
* Documentation technique
* Projet open source (GitHub)

### ❌ Exclus (volontairement)

* Interface frontend
* Authentification utilisateur
* Création / modification de profil par un utilisateur final
* Messagerie interne
* Notifications

---

##  Concept clé : le profil

Un **profil n’est pas un compte utilisateur**.

Il s’agit d’une **entrée de données** représentant une personne disponible pour :

* une opportunité professionnelle
* une collaboration
* un projet

Les profils sont gérés **via l’API uniquement** (usage interne, administratif ou automatisé).

---

##  Données d’un profil

### Champs obligatoires

* identifiant unique
* prénom ou pseudo
* pays
* ville
* domaine (tech / non-tech)
* statut de disponibilité (disponible / non disponible)
* moyen de contact (email ou WhatsApp)

### Champs optionnels

* tranche d’âge
* genre
* technologies / compétences
* description courte
* date de création
* date de mise à jour

---

##  Fonctionnalités backend

### Gestion des profils

* créer un profil
* consulter un profil par identifiant
* mettre à jour un profil
* supprimer un profil
* lister les profils (pagination)

### Recherche avancée (fonction centrale)

L’API permet de filtrer les profils selon :

* pays
* ville
* domaine
* technologies / compétences
* tranche d’âge
* genre
* statut de disponibilité

Les filtres sont **combinables**.

Résultat attendu :

* liste structurée de profils
* pagination
* ordre cohérent (date, pertinence, etc.)

---

##  Architecture technique

### Stack utilisée

* Langage : JavaScript
* Runtime : Node.js
* Framework : Express
* Base de données : MySQL
* ORM : Sequelize
* Format d’échange : JSON
* Gestion de versions : Git

---

Objectifs :

* séparation claire des responsabilités
* lisibilité du code
* maintenabilité
* évolutivité

---

## 🌐 API REST – Principes

* respect des conventions REST
* endpoints clairs et cohérents
* réponses HTTP normalisées
* gestion centralisée des erreurs
* validation stricte des données entrantes

---

## ▶Lancer le projet en local

### Prérequis

* Node.js (>= 18 recommandé)
* MySQL
* Git

### Installation

```bash
git clone https://github.com/VOGLOSSOU/parcours-backend-javaScript-TCC-INSTI
cd parcours-backend-javaScript-TCC-INSTI
npm install
```

### Configuration

Créer un fichier `.env` :

### Lancement

```bash
npm run dev
```

---

##  Contribution au projet

Ce projet est **open source** et ouvert aux contributions.

### Workflow de contribution

1. Consulter les **Issues ouvertes**
2. Commenter une issue pour se l’assigner
3. Forker le dépôt
4. Créer une branche dédiée

   ```bash
   git checkout -b issue-<num>-short-description
   ```
5. Développer la fonctionnalité
6. Ouvrir une Pull Request en liant l’issue (`Closes #num`)

---

##  Sécurité (niveau initial)

* validation stricte des données
* gestion propre des erreurs
* pas d’authentification utilisateur pour l’instant
* architecture prête pour l’ajout futur de rôles (admin)

---

##  Évolutions prévues

Le projet est conçu pour évoluer vers :

* ajout d’authentification
* interface frontend
* moteur de recherche plus performant
* indexation avancée
* statistiques et analytics
* gestion communautaire à grande échelle

---

##  Livrables attendus

* dépôt GitHub open source
* code backend structuré
* documentation API claire
* exemples de requêtes
* instructions de lancement local

---

##  Vision

Ce projet a vocation à être :

* un **produit réel**
* un **support pédagogique**
* une **base communautaire évolutive**

Il reflète les **bonnes pratiques du métier de développeur backend JavaScript**, tout en restant accessible, pragmatique et orienté qualité.
