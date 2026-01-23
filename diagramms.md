# Diagrammes UML - Plateforme de Profils

## 1. Diagramme de Classes

```
┌─────────────────────────────────────┐
│           Profile (Model)           │
├─────────────────────────────────────┤
│ - id: UUID                          │
│ - firstName: String                 │
│ - country: String                   │
│ - city: String                      │
│ - domain: Enum (tech/non-tech)      │
│ - availability: Enum                │
│ - contactMethod: String             │
│ - ageRange: String (optionnel)      │
│ - gender: String (optionnel)        │
│ - technologies: String[] (opt.)     │
│ - description: String (optionnel)   │
│ - createdAt: Date                   │
│ - updatedAt: Date                   │
└─────────────────────────────────────┘
                ↑
                │ manipule
                │
┌─────────────────────────────────────┐
│      ProfileRepository (Data)       │
├─────────────────────────────────────┤
│ + save(profile)                     │
│ + findById(id)                      │
│ + findAll(options)                  │
│ + findByFilters(criteria)           │
│ + update(id, data)                  │
│ + remove(id)                        │
└─────────────────────────────────────┘
                ↑
                │ utilise
                │
┌─────────────────────────────────────┐
│    ProfileService (Business Logic)  │
├─────────────────────────────────────┤
│ + createProfile(data)               │
│ + getProfileById(id)                │
│ + getAllProfiles(pagination)        │
│ + searchProfiles(filters)           │
│ + updateProfile(id, data)           │
│ + deleteProfile(id)                 │
└─────────────────────────────────────┘
                ↑
                │ utilise
                │
┌─────────────────────────────────────┐
│    ProfileController (HTTP Layer)   │
├─────────────────────────────────────┤
│ + create(req, res)                  │
│ + findById(req, res)                │
│ + findAll(req, res)                 │
│ + search(req, res)                  │
│ + update(req, res)                  │
│ + delete(req, res)                  │
└─────────────────────────────────────┘
```

---

## 2. Diagramme de Séquence - Recherche Avancée

```
Client API          Controller          Service          Repository          Database
    │                   │                  │                  │                  │
    │ GET /profiles/    │                  │                  │                  │
    │ search?country=BJ │                  │                  │                  │
    │ &domain=tech      │                  │                  │                  │
    ├──────────────────>│                  │                  │                  │
    │                   │                  │                  │                  │
    │                   │ searchProfiles() │                  │                  │
    │                   ├─────────────────>│                  │                  │
    │                   │                  │                  │                  │
    │                   │                  │ findByFilters()  │                  │
    │                   │                  ├─────────────────>│                  │
    │                   │                  │                  │                  │
    │                   │                  │                  │ SELECT * WHERE   │
    │                   │                  │                  │ country='BJ' AND │
    │                   │                  │                  │ domain='tech'    │
    │                   │                  │                  ├─────────────────>│
    │                   │                  │                  │                  │
    │                   │                  │                  │   résultats      │
    │                   │                  │                  │<─────────────────┤
    │                   │                  │                  │                  │
    │                   │                  │  profils trouvés │                  │
    │                   │                  │<─────────────────┤                  │
    │                   │                  │                  │                  │
    │                   │ profils formatés │                  │                  │
    │                   │<─────────────────┤                  │                  │
    │                   │                  │                  │                  │
    │  JSON Response    │                  │                  │                  │
    │  200 OK           │                  │                  │                  │
    │<──────────────────┤                  │                  │                  │
    │                   │                  │                  │                  │
```

---

## 3. Diagramme de Cas d'Utilisation

```
                    ┌──────────────────────────────────────┐
                    │   Plateforme de Profils - Backend    │
                    │                                      │
┌─────────────┐     │  ┌────────────────────────────┐     │
│             │     │  │  Créer un profil           │     │
│ Adminis-    │────────>│                            │     │
│ trateur     │     │  └────────────────────────────┘     │
│             │     │                                      │
│             │     │  ┌────────────────────────────┐     │
│             │────────>│  Mettre à jour un profil   │     │
│             │     │  └────────────────────────────┘     │
│             │     │                                      │
│             │     │  ┌────────────────────────────┐     │
│             │────────>│  Supprimer un profil       │     │
└─────────────┘     │  └────────────────────────────┘     │
                    │                                      │
                    │  ┌────────────────────────────┐     │
┌─────────────┐     │  │  Consulter un profil       │     │
│             │────────>│                            │     │
│   API       │     │  └────────────────────────────┘     │
│ Consumer    │     │                                      │
│             │     │  ┌────────────────────────────┐     │
│             │────────>│  Lister tous les profils   │     │
│             │     │  └────────────────────────────┘     │
│             │     │                                      │
│             │     │  ┌────────────────────────────┐     │
│             │────────>│  Rechercher des profils    │     │
│             │     │  │                            │     │
└─────────────┘     │  │  (inclut)                  │     │
                    │  │  - Filtrer par pays        │     │
                    │  │  - Filtrer par ville       │     │
                    │  │  - Filtrer par domaine     │     │
                    │  │  - Filtrer par technos     │     │
                    │  │  - Filtrer par âge         │     │
                    │  │  - Filtrer par genre       │     │
                    │  │  - Filtrer par dispo       │     │
                    │  │  - Combinaison de filtres  │     │
                    │  └────────────────────────────┘     │
                    │                                      │
                    └──────────────────────────────────────┘
```

---

## Résumé

**Diagramme de Classes** : Structure en 4 couches (Controller → Service → Repository → Model) pour une architecture propre et maintenable.

**Diagramme de Séquence** : Flux complet d'une recherche de profils, montrant l'interaction entre toutes les couches.

**Diagramme de Cas d'Utilisation** : Deux acteurs principaux (Admin et API Consumer) avec leurs actions respectives sur la plateforme.