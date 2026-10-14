---
name: frontend-engineering
description: Met en œuvre des sites et applications front-end structurés, maintenables et fiables, en inspectant d'abord la stack, en construisant des composants réutilisables et en validant les interactions réelles.
---

# Front-End Engineering

## Avant tout changement
- Inspecter l'arborescence, `package.json`, les scripts, la configuration, les routes et le système de style existant.
- Identifier les conventions et réutiliser les composants en place lorsqu'ils sont sains.
- Préserver les fonctionnalités existantes ; ne pas remplacer toute la stack par préférence personnelle.
- Établir un petit plan avant les changements importants.

## Architecture
- Séparer contenu, données et présentation lorsque cela facilite la personnalisation.
- Créer des composants utiles, pas un composant par ligne ni un énorme composant de page.
- Utiliser des noms explicites, des types stricts quand TypeScript est présent et des états de chargement/erreur vides prévisibles.
- Valider les données saisies par les utilisateurs côté serveur lorsque le serveur existe ; la validation client seule n'est pas une protection.
- Utiliser des liens pour naviguer et des boutons pour effectuer une action.
- Ajouter les attributs d'accessibilité aux composants interactifs personnalisés.

## Qualité et sécurité
- Ne jamais exposer de secret, token privé ou clé d'administration dans le bundle client.
- Échapper ou traiter le contenu dynamique de façon sûre. Éviter `dangerouslySetInnerHTML` sauf besoin justifié et contenu assaini.
- Respecter les erreurs réseau et informer l'utilisateur sans prétendre qu'une action a réussi.
- Ne pas désactiver les règles TypeScript ou lint pour faire disparaître une erreur sans en comprendre la cause.
- Ne pas ajouter une dépendance si une solution simple et maintenable existe déjà.

## Formulaires
- Associer une étiquette accessible à chaque champ.
- Valider les champs obligatoires et afficher les erreurs près des champs concernés.
- Ajouter les états en cours, réussite et échec.
- Ne jamais montrer « message envoyé » si aucune soumission réelle n'a été effectuée.

## Livraison
- Exécuter les scripts de vérification pertinents (`lint`, `typecheck`, `test`, `build`) s'ils existent.
- Résoudre les erreurs bloquantes.
- Documenter les variables d'environnement nécessaires sans révéler leur valeur.
