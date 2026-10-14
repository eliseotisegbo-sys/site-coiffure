---
name: motion-interactions
description: Conçoit des animations UI, du scroll narratif, des transitions et des micro-interactions fluides, accessibles et performantes, notamment avec CSS, GSAP ou Framer Motion.
---

# Motion & Interactions

## Principes
- Toute animation doit indiquer un changement d'état, guider l'attention, expliquer une relation ou donner un retour à l'utilisateur.
- Préférer une animation courte à une animation longue. Garder la lecture et l'action prioritaires.
- Ne pas animer simultanément tous les éléments d'une section.
- Garder le comportement natif de défilement ; éviter le scroll-jacking.

## Choisir la technologie
- CSS pour hover, focus, états de boutons et transitions simples.
- Framer Motion lorsque le projet React bénéficie de transitions entre composants ou d'une orchestration simple.
- GSAP/ScrollTrigger lorsque le récit nécessite une synchronisation précise avec le scroll, du pinning ou une timeline complexe.
- Ne pas ajouter plusieurs moteurs d'animation pour des cas d'usage identiques sans justification.

## Bonnes pratiques
- Animer prioritairement `transform` et `opacity`.
- Utiliser `IntersectionObserver` pour déclencher les révélations simples au viewport.
- Nettoyer les listeners, observers, timelines et instances à la destruction des composants.
- Ne pas relancer des animations coûteuses à chaque pixel de scroll.
- Garder les CTA accessibles, stables et faciles à toucher.
- Pour les effets de curseur, vérifier la présence d'un pointeur fin et désactiver l'effet sur tactile.
- Respecter `prefers-reduced-motion` et proposer une version sans mouvement excessif.

## Scroll immersif
1. Définir le fil narratif entre les sections.
2. Choisir seulement quelques moments forts.
3. Maintenir une issue de navigation claire et une progression compréhensible.
4. Vérifier que les éléments épinglés ne masquent pas de contenu.
5. Tester les changements de taille et l'orientation mobile.

## Validation
Tester navigation clavier, hover, focus, scroll rapide, changement de route, retour arrière, tailles mobiles et mouvement réduit. Vérifier qu'aucune animation ne rend la page lente ou ne détourne continuellement l'attention.
