# C.14 Préparer et exécuter les plans de tests d’une application

- [C.14 Préparer et exécuter les plans de tests d’une application](#c14-préparer-et-exécuter-les-plans-de-tests-dune-application)
  - [Versions](#versions)
  - [Matrice de Test](#matrice-de-test)
  - [Tests](#tests)
    - [Tests Unitaires et d'Intégration](#tests-unitaires-et-dintégration)
    - [Tests Fonctionnels](#tests-fonctionnels)
    - [Plan de Non Régression](#plan-de-non-régression)
  - [CI/CD](#cicd)
  - [API testing (integration)](#api-testing-integration)
  - [Auth](#auth)
  - [Test unitaires hashPassword](#test-unitaires-hashpassword)

## Versions

- **Version** : 1.0
- **Date** : 13/3/2024

## Matrice de Test

| Tâche                                 | Validée | Lien vers le fichier/ligne de code |
| ------------------------------------- | :-----: | ---------------------------------- |
| 🔜 Élaboration de la matrice de test |   🟠    |                                    |

## Tests

### Tests Unitaires et d'Intégration

| Tâche                                                 | Validée | Lien vers le fichier/ligne de code |
| ----------------------------------------------------- | :-----: | ---------------------------------- |
| Implémentation des tests unitaires avec Jest          |   ✅    |                                    |
| Implémentation des tests d'intégration avec Supertest |   ✅    |                                    |

### Tests Fonctionnels

| Tâche                                              | Validée | Lien vers le fichier/ligne de code |
| -------------------------------------------------- | :-----: | ---------------------------------- |
| 🔜 Configuration de Cypress pour les tests E2E    |   🟠    |                                    |
| 🔜 Configuration de Playwright pour les tests E2E |   🟠    |                                    |

### Plan de Non Régression

| Tâche                                         | Validée | Lien vers le fichier/ligne de code |
| --------------------------------------------- | :-----: | ---------------------------------- |
| 🔜 Établissement d'un plan de non régression |   🟠   |                                    |

## CI/CD

| Tâche                                    | Validée | Lien vers le fichier/ligne de code |
| ---------------------------------------- | :-----: | ---------------------------------- |
| 🔜 Mise en place d'une pipeline CI/CD   |   🟠    |                                    |
| 🔜 Automatisation des tests dans la CI  |   🟠    |                                    |
| 🔜 Configuration du déploiement continu |   🟠    |                                    |


| Tâche                                                           | Validée | Lien                                             |
|-----------------------------------------------------------------|-----------|------------------------------------------------|
| Création des dossiers et fichiers Routes (User, Room, Spot...)  |    ✅     |                                                |
| Création des dossiers et fichiers Modèles (User, Room, Spot...) |    ✅     |                                                |
| Mise en place des contrôleurs (User, Room, Spot...)             |    ✅     |                                                |
| 🔜 Implémenter les services                                     |    ✅     |                                                |


| Tâche                                                           | Validée | Lien                                             |
|-----------------------------------------------------------------|-----------|------------------------------------------------|
| Création des dossiers et fichiers Routes (User, Room, Spot...)  |    ✅     |                                                |
| Création des dossiers et fichiers Modèles (User, Room, Spot...) |    ✅     |                                                |
| Mise en place des contrôleurs (User, Room, Spot...)             |    ✅     |                                                |
| 🔜 Implémenter les services                                     |    ✅     |                                                |


## API testing (integration)

| Test ID | Entité      | Méthode HTTP | Description du test                                        | Validée |
| ------- | ----------- | ------------ | ---------------------------------------------------------- | ------- |
| 1       | membership  | GET          | Récupérer les informations d'une adhésion spécifique       | ✅      |
| 2       | membership  | POST         | Créer une nouvelle adhésion                                |   ✅       |
| 3       | membership  | PUT          | Mettre à jour les informations d'une adhésion existante    |  ✅        |
| 4       | membership  | DELETE       | Supprimer une adhésion existante                           |  ✅        |
| 5       | membership  | GET (List)   | Récupérer la liste de toutes les adhésions                 |   ✅       |
| 6       | reservation | GET          | Récupérer les informations d'une réservation spécifique    |  ✅        |
| 7       | reservation | POST         | Créer une nouvelle réservation                             |  ✅        |
| 8       | reservation | PUT          | Mettre à jour les informations d'une réservation existante |   ✅       |
| 9       | reservation | DELETE       | Supprimer une réservation existante                        |   ✅       |
| 10      | reservation | GET (List)   | Récupérer la liste de toutes les réservations              |  ✅        |

## Auth

| Test ID | Scénario                       | Méthode HTTP | Endpoint        | Description du test                                      | 
|---------|-------------------------------|--------------|-----------------|----------------------------------------------------------|
| 1       | Sign Up - Succès              | POST         | /signup         | Créer un nouvel utilisateur avec des données valides     |
| 2       | Sign Up - Email déjà utilisé  | POST         | /signup         | Essayer de créer un utilisateur avec un email existant   |
| 3       | Sign Up - Données invalides   | POST         | /signup         | Essayer de créer un utilisateur avec des données invalides|
| 4       | Sign In - Succès              | POST         | /signin         | Connecter un utilisateur avec des identifiants valides   |
| 5       | Sign In - Mot de passe incorrect| POST         | /signin         | Essayer de connecter avec un mot de passe incorrect      |
| 6       | Sign In - Utilisateur non trouvé| POST         | /signin         | Essayer de connecter avec un email non enregistré        |
| 7       | Sign In - Données invalides   | POST         | /signin         | Essayer de connecter avec des données invalides          |
| 8       | Sign Up - Mot de passe faible | POST         | /signup         | Essayer de créer un utilisateur avec un mot de passe faible|
| 9       | Sign Up - Email invalide      | POST         | /signup         | Essayer de créer un utilisateur avec un email invalide   |
| 10      | Sign Up - Champ manquant      | POST         | /signup         | Essayer de créer un utilisateur avec un champ manquant   |

## Test unitaires hashPassword


| Test ID | Scénario                                      | Entrée                      | Sortie attendue                            | Description du test                                                    |
|---------|-----------------------------------------------|-----------------------------|--------------------------------------------|------------------------------------------------------------------------|
| 1       | Hashage réussi d'un mot de passe              | 'mon mot de passe'             | HashedPassword qui match le format bcrypt  | Vérifie que le mot de passe est correctement hashé et correspond au format bcrypt |
| 2       | Mot de passe vide                             | ""                          | Erreur                                     | Vérifie que la méthode lance une erreur si le mot de passe est vide     |
| 3       | Mot de passe nul                              | null                        | Erreur                                     | Vérifie que la méthode lance une erreur si le mot de passe est null     |
| 4       | Gestion des erreurs de bcrypt                 | 'monMotDePasse'             | Erreur 'bcrypt error'                      | Simule une erreur dans bcrypt et vérifie que la méthode gère cette erreur correctement |