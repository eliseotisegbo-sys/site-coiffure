---
name: immersive-3d-web
description: Planifie et implémente des expériences 3D web interactives avec Three.js ou React Three Fiber, en privilégiant le sens, l'accessibilité, les performances, les solutions de repli et le comportement sur mobile.
---

# Immersive 3D Web

## Principe directeur
La 3D doit renforcer le récit, montrer un produit, clarifier une idée ou créer une interaction mémorable. Elle n'est pas une preuve de qualité à elle seule. Si une image, une courte animation CSS ou une vidéo optimisée répond mieux au besoin, choisir la solution la plus simple.

## Choix technique
- Pour une application React, envisager Three.js avec React Three Fiber et Drei lorsque cela simplifie réellement la scène.
- Pour une scène simple non-React, utiliser Three.js directement si la stack le permet.
- Charger la scène par import dynamique et éviter de bloquer le rendu initial.
- Ne pas ajouter plusieurs bibliothèques 3D ou de post-traitement sans nécessité mesurable.

## Planification
1. Définir ce que la scène doit communiquer.
2. Déterminer l'action utilisateur attendue : rotation, exploration, hover, progression au scroll, configuration d'un produit, etc.
3. Définir la version mobile et la solution de repli avant de produire les assets.
4. Fixer un budget de complexité : nombre de meshes, textures, lumières, draw calls et effets de post-traitement.
5. Charger les ressources à la demande et afficher un état de chargement discret lorsque nécessaire.

## Interaction
- Utiliser des contrôles compréhensibles et non bloquants.
- Ne jamais empêcher le scroll principal sans raison fonctionnelle claire.
- Les mouvements liés à la souris doivent être doux, bornés et désactivables.
- Fournir une commande de pause ou de réduction des mouvements lorsqu'il existe une animation continue importante.
- Ne pas faire dépendre un texte essentiel ou une fonction critique de la seule scène 3D.

## Performance et robustesse
- Préférer des géométries et textures raisonnables, des matériaux partagés et des ombres limitées.
- Compresser les textures quand les outils du projet le permettent.
- Réutiliser les géométries, instancier les objets répétés et libérer proprement les ressources.
- Utiliser `requestAnimationFrame` via le renderer prévu, sans boucle manuelle concurrente.
- Réduire la qualité sur appareils moins puissants et désactiver les effets coûteux sur mobile lorsque nécessaire.
- Détecter l'indisponibilité de WebGL et afficher un fallback 2D élégant avec le même sens et le même appel à l'action.
- Respecter `prefers-reduced-motion`.

## Contrôle visuel
Tester la scène sur desktop et téléphone, contrôler la lisibilité du texte par-dessus l'image, vérifier les collisions avec la navigation, la taille du bundle et les éventuelles erreurs console. Ne déclarer un niveau de FPS ou une taille de bundle que si ces valeurs ont réellement été mesurées.

## À éviter
- Scène lourde en plein écran avant l'affichage du contenu principal.
- Caméra qui bouge sans arrêt, effets de particules sans but et mouvements qui donnent le mal des transports.
- Liens, textes, menus ou CTA recouverts par le canvas.
- Expérience inutilisable sans GPU performant.
