---
name: project-ingestion
description: Analyse une URL ou un lien fourni par l'utilisateur pour préparer une fiche de projet vérifiée dans un portfolio, en extrayant uniquement les informations publiques réellement accessibles et en proposant un brouillon avant publication.
---

# Import de projet à partir d'une URL

## Déclenchement
Utiliser cette compétence lorsque l'utilisateur écrit « ajoute ce projet », fournit une URL de site, GitHub, GitLab, Vercel, Netlify, Figma, Behance, Dribbble, YouTube, Loom, documentation ou une autre ressource publique.

## Procédure
1. Ouvrir l'URL avec les outils disponibles.
2. Vérifier si elle est publique et accessible. Ne pas contourner les connexions, protections ou contrôles d'accès.
3. Identifier le nom, le type, le but, l'état et les informations publiques clairement établis.
4. Examiner les métadonnées publiques et images Open Graph si disponibles. Récupérer seulement les médias qu'il est approprié d'utiliser.
5. Si le lien est un dépôt de code, inspecter le README et les fichiers accessibles plutôt que de déduire toute la stack à partir du nom du dépôt.
6. Séparer les faits observés des inférences. Ne pas affirmer un résultat, une fonctionnalité, un utilisateur ou une technologie qui n'est pas vérifiable.
7. Rédiger un titre, un résumé de quelques phrases, des catégories, les technologies vérifiées et des liens utiles.
8. Préparer une fiche en statut `draft` ou `review`, jamais `published` par défaut.
9. Montrer le brouillon à l'utilisateur ou au propriétaire pour validation.
10. Après validation, placer le projet dans la catégorie pertinente et conserver la possibilité de modifier ou retirer la fiche.

## Schéma de données recommandé

```json
{
  "id": "slug-stable",
  "title": "Nom du projet",
  "slug": "nom-du-projet",
  "category": "Web | SaaS | IoT | AI | Experiment | Other",
  "summary": "Résumé factuel et concis",
  "context": "Contexte documenté, si connu",
  "problem": "Problème documenté, si connu",
  "solution": "Solution observée ou décrite dans les sources",
  "technologies": [],
  "year": null,
  "status": "draft",
  "featured": false,
  "images": [],
  "links": [],
  "sourceUrl": "URL fournie",
  "verifiedFields": [],
  "unknownFields": []
}
```

## Médias
- Priorité aux captures fournies par l'auteur, médias autorisés et images publiques du projet.
- Respecter les conditions d'utilisation et les droits des images.
- Ne jamais prétendre qu'une image de stock est une capture d'écran réelle du projet.
- Si aucune image n'est accessible, préparer un placeholder cohérent ou demander une capture.

## Quand le lien est inaccessible
Indiquer le problème avec précision. Demander une capture, une description ou un fichier si nécessaire. Ne pas inventer le contenu de la page à partir de son URL seule.

## Publication
Publier uniquement après validation du texte, des images, des liens et des affirmations importantes. Vérifier que la nouvelle fiche s'intègre au système de projets sans casser la navigation ou le build.
