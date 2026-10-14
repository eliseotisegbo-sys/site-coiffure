---
name: accessibility-responsive
description: Améliore l'accessibilité et l'expérience responsive des sites grâce à une structure sémantique, une navigation clavier, des contrastes corrects et des interactions adaptées au tactile.
---

# Accessibility & Responsive

## Objectif
Viser une expérience proche du niveau WCAG 2.2 AA, sans prétendre à une certification automatique. Corriger les barrières constatées et documenter les vérifications restantes.

## Structure
- Utiliser les éléments HTML sémantiques : `header`, `nav`, `main`, `section`, `footer`, `button`, `a`, `form`.
- Respecter une hiérarchie de titres compréhensible.
- Ajouter un lien d'évitement pour les longues pages lorsque pertinent.
- Donner un texte alternatif utile aux images informatives. Utiliser un alt vide pour les images purement décoratives.

## Contraste et texte
- Vérifier les contrastes du texte, des icônes et des états de contrôle.
- Ne pas transmettre une information uniquement par la couleur.
- Garder les paragraphes lisibles, avec une longueur de ligne raisonnable et une taille confortable sur téléphone.
- Zoom à 200 % sans perte d'information ni chevauchement majeur.

## Clavier et formulaires
- Tout élément interactif doit être utilisable au clavier.
- Le focus doit être visible.
- Ne pas piéger le focus hors des dialogues correctement implémentés.
- Les champs ont des labels, instructions et messages d'erreur explicites.
- Les boutons ont un nom accessible et une cible tactile suffisamment grande, idéalement autour de 44 x 44 px lorsque la mise en page le permet.

## Mouvement
- Respecter `prefers-reduced-motion`.
- Éviter les clignotements et mouvements continus inutiles.
- Le contenu important ne doit pas dépendre d'une animation pour apparaître.

## Responsive
- Tester au moins un petit mobile, un grand mobile, une tablette et un ordinateur.
- Prévenir les débordements horizontaux.
- Adapter la navigation, les grilles, les tailles d'image et les CTA.
- Ne pas exiger le hover sur mobile.
- Vérifier les orientations et les champs de formulaire.

## Contrôle final
Naviguer au clavier, vérifier les contrastes, les alternatives textuelles, les labels, l'ordre du focus, les messages d'erreur, le zoom et les affichages mobiles. Utiliser les outils automatisés comme aide, sans les considérer comme un audit complet.
