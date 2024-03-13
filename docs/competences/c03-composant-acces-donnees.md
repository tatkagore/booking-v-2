# C3. Développer des composants d’accès aux données

- [C3. Développer des composants d’accès aux données](#c3-développer-des-composants-daccès-aux-données)
  - [Versions](#versions)
  - [Routes, modeles, contrôleurs et services](#routes-modeles-contrôleurs-et-services)
  - [Sécurité](#sécurité)
  - [Validation des données](#validation-des-données)
  - [Base de données](#base-de-données)
  - [Tests](#tests)
  - [Documentation API](#documentation-api)

## Versions

- **Version** : 1.0
- **Date** : 13/3/2024

## Routes, modeles, contrôleurs et services

| Tâche                                                           | Validée | Lien          |
| --------------------------------------------------------------- | ------- | ------------- |
| Création des dossiers et fichiers Routes (User, Room, Spot...)  | ⏳       | ./routes      |
| Création des dossiers et fichiers Modèles (User, Room, Spot...) | ⏳       | ./models      |
| Mise en place des contrôleurs (User, Room, Spot...)             | 🟠     | ./controllers |
| 🔜 Implémenter les services                                    | 🟠     |               |

## Sécurité

| Tâche                                                      | Validée | Lien                 |
| ---------------------------------------------------------- | ------- | -------------------- |
| Sécurité et Authentification                               | ⏳       | [Sécurité GitHub][3] |
| Utiliser bcrypt pour le hashage des mots de passe          | ⏳       | [Bcrypt GitHub][2]   |
| Mettre en place l'authentification avec JWT (jsonwebtoken) | ⏳       | [JWT GitHub][1]      |

## Validation des données

| Tâche                                                           | Validée | Lien |
| --------------------------------------------------------------- | ------- | ---- |
| 🔜 Intégrer express-validator pour la validation des données   | ⏳      |      |
| 🔜 Nettoyer les données entrantes pour prévenir les injections | 🟠      |      |
| Établir une nomenclature cohérente pour le code                 | 🟠      |      |
| Commenter et expliquer les segments de code complexes           | 🟠      |      |

## Base de données

| Tâche                                                | Validée | Lien |
| ---------------------------------------------------- | ------- | ---- |
| 🔜 Concevoir le schéma de base de données           |    🟠   |      |
| Créer les tables et relations conformément au schéma | 🟠      |      |

## Tests

| Tâche                                                                   | Validée | Lien |
| ----------------------------------------------------------------------- | ------- | ---- |
| 🔜 Définir une matrice de test pour couvrir toutes les fonctionnalités | 🟠      |      |
| 🔜 Implémenter les tests unitaires et d'intégration                    | 🟠      |      |

## Documentation API

| Tâche                                               | Validée | Lien |
| --------------------------------------------------- | ------- | ---- |
| 🔜 Préparer la documentation de l'API avec Swagger | 🟠      |      |

## Liens

[1]: https://github.com/tatkagore/booking-v-2/blob/e6b2af8e090fd0f07930c58a0951cd9acc6b21f6/middlewares.js#L4
[2]: https://github.com/tatkagore/booking-v-2/blob/e6b2af8e090fd0f07930c58a0951cd9acc6b21f6/routes/auth.js#L30
[3]: https://github.com/tatkagore/booking-v-2/blob/e6b2af8e090fd0f07930c58a0951cd9acc6b21f6/routes/auth.js#L12