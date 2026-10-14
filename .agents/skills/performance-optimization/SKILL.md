---
name: performance-optimization
description: Optimise les performances des sites web, les médias, les bundles JavaScript, le chargement différé et les scènes interactives afin de livrer une expérience rapide sur mobile et desktop.
---

# Performance Optimization

## Méthode
1. Mesurer ou inspecter avant d'optimiser lorsque les outils le permettent.
2. Identifier les éléments qui bloquent le rendu initial et les plus gros assets.
3. Optimiser d'abord les problèmes qui affectent le plus l'expérience utilisateur.
4. Mesurer de nouveau et rapporter les résultats réels, pas des estimations présentées comme des mesures.

## Images et médias
- Utiliser des tailles correspondant à l'affichage, des formats modernes lorsque supportés et des dimensions explicites pour éviter le layout shift.
- Utiliser `srcset`/`sizes` ou les mécanismes d'optimisation du framework.
- Charger en différé les médias hors écran ; ne pas lazy-loader l'image LCP principale sans raison.
- Préférer une image fixe optimisée ou une vidéo légère à une scène 3D lourde si le bénéfice est similaire.

## JavaScript et rendu
- Charger dynamiquement les composants lourds non requis dans le premier écran.
- Éviter les dépendances dupliquées et les scripts inutiles.
- Éviter les changements de layout synchrones dans les handlers de scroll.
- Utiliser `transform` et `opacity` pour les animations lorsque possible.
- Éviter de démarrer plusieurs boucles de rendu ou de calcul concurrentes.

## 3D
- Limiter textures, lumières, géométries et post-processing.
- Activer les scènes au moment utile et libérer les ressources correctement.
- Créer des niveaux de qualité et un fallback 2D lorsque l'appareil ne peut pas assurer une expérience fluide.

## Objectifs
Utiliser Core Web Vitals comme repères, et non comme promesse sans mesure : LCP autour de 2,5 s ou moins, INP autour de 200 ms ou moins, CLS autour de 0,1 ou moins au 75e percentile lorsque les mesures réelles sont disponibles.

## Livraison
Exécuter les builds et outils de performance disponibles. Signaler la méthode et la date de mesure, les limites et les plus grosses opportunités restantes. Ne jamais affirmer un score Lighthouse ou un FPS qui n'a pas été testé.
