# ProgressiveWorkoutApp

<!--ts-->
- [ProgressiveWorkoutApp](#progressiveworkoutapp)
  - [Participants](#participants)
  - [Description](#description)
  - [Choix des technologies](#choix-des-technologies)
  - [Build le projet](#build-le-projet)
  - [Retrouver le projet en ligne](#retrouver-le-projet-en-ligne)
  - [Analyse Lighthouse](#analyse-lighthouse)
  <!-- Added by: kurai, at: mercredi 13 mai 2020, 22:59:15 (UTC+0200) -->
  <!--te-->

## Participants

- **Thibaud Germain** (`https://github.com/Grimnir777`)
- **Corentin Troadec** (`https://github.com/Drainman`)

## Description

Ce projet a été réalisé dans le cadre du module Développement Web.
Il s'agit d'une Progressive Web App (PWA) ayant pour but de vous accompagner lors de vos séances de sports.

Essayez maintenant **ProgressiveWorkoutApp** pour profiter pleinement de toutes nos features :

- Personnalisez vos séances à vos souhaits : choissisez les exercices de votre choix parmis une liste fournie de proposition.
- Choisissez également le temps de repos désiré.
- Lancez-les de chez vous, dehors, en ligne comme hors-ligne : L'accès à l'application est illimité.
- Installez l'application sur vos médias (PC, Mac, Android, IOS) pour y accéder rapidement.
- Chronométrez votre effort pour suivre vos performances.

## Choix des technologies

- **Angular :** Coeur de notre application, ce choix a été motivé par plusieurs aspects. Nous en avons déja un peu pratiqué, ce qui est toujours un plus, mais aussi car cette technologie offre énormément d'aide dans le développement d'application PWA. Ce framework impose également une architecture précise permettant un développement en groupe plus efficace. Le langage de base (JavaScript) est également très facile à utiliser.
- **SCSS :** En plus de profiter pleinement du CSS, ce format supporte l'utilisation de variable ou la définition de règles pouvant être réutilisées à plusieurs endroits et dans tous fichiers `.scss` du projet.
- **BootStrap :** Combiné avec du SCSS cette technologie nous permet de pouvoir construire rapidement des IHM agréables et interractif.
- **Prettier :** CamelCase, Snake Case, Random Case. On a tous notre manière de coder, notre manière de nommer. Ce n'est jamais la même et quand on doit relire le code des autres parfois, ça nous demande un effort. Et l'indentation... on en parle ? Autant éviter de trop réfléchir et de se prendre la tête plus tard. C'est pourquoi nous avons intégré Prettier pour formatter notre code et garder la même logique tout à long de notre développement.
- **Husky :** Dans la même logique que les choix précédents, husky permet de vérifier nombre d'éléments avant de faire un commit. Cette rapide analyse suit un standard de nommage. Si celui-ci n'est pas respecté, le commit ne peut s'effectuer et ce tant que la convention n'est pas appliquée à la lettre (littéralement!). Il lance également le _Linter_ qui se charge de vérifier la concordance du code.

## Build le projet

**Pré-requis :**

- Avoir installé NodeJS (**V12+**) et la dépendance npm correspondante.
- Avoir de la patience (car npm... c'est lent!)

1. Pour build le projet il vous faudra récupérer les sources ici présentes.
2. Une fois dans votre projet tapez dans votre console `npm install`.
3. Tapez `npm run build` afin de construire le projet. Le build sera enregistré dans le dossier `dist/`.
4. Pour lancer le server de l'application entrez ensuite : `npm run start`

## Retrouver le projet en ligne

Une question tout à fait légitime se pose.

> Où puis-je donc retrouver cette incroyable application ?

C'est ici : https://progressive-workout.herokuapp.com/
C'est gratuit, pas besoin de compte ! De suite prête à l'utilisation !

## Analyse Lighthouse

Nous avons pris le temps d'analyser nos résultats Lighthouse pour en tirer les conclusions suivantes :

- L'application est bonne, voir très bonne sur presque tous les points
  - **Accessibility :** 90%
  - **Best pratices :** 100 %
  - **SEO :** 100%
- Un seul point reste en défaut la **performance** (~50%).

Bootstrap semble être une de cause principale de ce défaut. Nous nous en sommes rendu compte un peu tard et nous n'avons donc pas pu corriger cet aspect. Pour autant, si le projet été à refaire nous aurions volontiers sacrifié un peu de confort, apporté par BootStrap, pour un peu plus de performance.
