# One Page présentant les espèces animales et végétales sur la liste Rouge de l'IUCN

[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

**Bienvenue sur ce projet éducatif sur les espèces françaises présentes sur la liste rouge de l'[IUCN](https://www.iucnredlist.org/fr)**

[Version en ligne](https://endangered-species.laetitia-dev.com)

## Technologies

- **Back** réalisé avec un Symfony skeleton. L'application nécessite un token pour consommer l'API de l'IUCN, j'ai donc fait le choix d'utiliser un petit framework afin de le sécuriser en faisant mes requêtes depuis un back-end : 
  - Bundles utilisés : Nelmio/cors, annotations, HTTP Client, HTTP Foundation, profiler.

- **Front** avec Bootstrap et Javascript natif pour le traitement des requêtes. Le but pédagogique de ce projet était de pratiquer Javascript, Ajax et les promesses. 

- Consommation de l'API [de l'IUCN](http://apiv3.iucnredlist.org/) pour les données

## Ce que j'ai appris

Je me suis retrouvée confrontée à un problème de pending response que je ne connaissais pas, qui m'a obligé à trouver une solution. Nous n'avions pas vu les promesses en formation, ce fut l'occasion de les découvrir et de les manipuler et ce fut très formateur.

J'ai également refondu tout le projet après avoir réalisé que le token ne pouvait pas être stocké de manière sécurisé côté client. 
Ce fut l'occasion de re-travailler sur Symfony, en mode skeleton.

## Progression

**Réalisés**

- Récupération et traitement des données fonctionnels 
- Mise en page "acceptable" avec Bootsrap
- Utilisation vantaJS pour background
- Refonte avec le back en Symfony skeleton

**A faire**

- Pouvoir selectionner un autre pays, ou des catégories,
- Meilleure utilisation des datas renvoyées par l'api,
- SEO à étudier et réaliser.

## Evolution

J'aimerais traiter plus de données envoyées par l'API pour en faire une application plus pédagogique et agréable à utiliser.
Et pourquoi pas refaire le front pour apprendre VueJS?
