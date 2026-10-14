---
name: qa-browser-testing
description: Vérifie les sites avec une démarche QA structurée dans le navigateur et les outils disponibles : routes, liens, interactions, formulaires, responsive, erreurs console et cohérence visuelle.
---

# QA et tests navigateur

## Plan de test minimal
1. Démarrer l'application avec la commande prévue par le projet.
2. Ouvrir la page dans le navigateur intégré ou l'outil de navigateur disponible.
3. Tester chaque route et les liens principaux.
4. Cliquer sur tous les CTA et vérifier leur destination ou leur effet.
5. Tester les formulaires avec des données valides, invalides et champs manquants.
6. Vérifier les états de chargement, réussite, erreur et vide.
7. Tester les menus desktop et mobile.
8. Contrôler au moins une largeur mobile et une largeur desktop.
9. Lire les erreurs console et les problèmes réseau significatifs.
10. Exécuter lint, types, tests et build lorsqu'ils existent.

## Points à contrôler visuellement
- Aucun débordement horizontal.
- Aucun texte coupé, élément superposé ou bouton masqué.
- Les images sont chargées et ont un cadrage correct.
- Les CTA sont visibles et distincts.
- Les contrastes et tailles restent lisibles.
- Les animations ne gênent pas la navigation.

## Contrats d'interaction
Un bouton doit produire une action réelle. Un lien doit ouvrir la destination prévue. Un formulaire ne doit pas afficher de succès sans soumission réelle. Un bouton de commande WhatsApp doit former un message correct et utiliser un numéro fourni par le propriétaire.

## Données de test
Employer des données fictives clairement identifiées. Ne pas envoyer de demande test à un vrai client, ne pas passer de commande réelle et ne pas publier sur un compte externe sans autorisation explicite.

## Rapport final
Séparer clairement : tests réussis, tests échoués, éléments non testés et problèmes connus. Ne jamais prétendre qu'un site a été testé sur un navigateur ou un appareil auquel l'agent n'a pas accès.
