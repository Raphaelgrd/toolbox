# Un dossier par site

Chaque site de la librairie a son propre emplacement :

```
sites/<identifiant-du-site>/
  site.json          nom, URL, secteur, description, style, ambiance (clair | sombre)
  kit.json           design system : couleurs, typo, espacements, rayons, ombres, animations
  composants/        un fichier .html par composant
  sections/          un fichier .html par section
```

## Ajouter un site

1. Copier `_modele/` et le renommer avec l'identifiant du site (ex. `cabinet-dupont`).
2. Remplir `site.json` et `kit.json`.
3. Déposer les composants et sections en `.html` (format ci-dessous).
4. Lancer `npm run db:seed` : le site apparaît dans l'app, avec son espace `/sites/<identifiant>`.

Les dossiers qui commencent par `_` sont ignorés.

## Format d'un fichier composant ou section

```html
<!--
name: Bouton pilule
category: boutons
description: Une phrase.
style: minimaliste
complexite: simple            (simple | moyenne | avancee)
licence: libre                (libre | inspiration, facultatif)
dependencies: GSAP            (facultatif)
variants: plein, contour      (facultatif, composants)
components: bouton-pilule     (facultatif, sections : composants utilisés)
-->
<style>
  .pill { background: var(--color-primary); padding: var(--space-4) var(--space-6); }
</style>

<button class="pill">Commencer</button>
```

- Le nom du fichier sert d'identifiant (`bouton-pilule.html` → `bouton-pilule`). Il doit être unique dans toute la librairie.
- Catégories des composants : boutons, cartes, inputs, navigation, toggles, loaders, badges, modales, sliders.
- Types de sections : hero, features, pricing, temoignages, cta, faq, footer, contact.
- Le CSS n'utilise que les variables du kit, pour pouvoir appliquer l'élément au kit d'un autre site.
- La couleur dominante et la version React sont calculées automatiquement.

## Polices

Les aperçus tournent sans accès réseau : ils utilisent les polices installées sur la machine et
retombent sur les polices de secours du kit. Dans un vrai projet, charger les polices du kit.
Pulsor utilise **PP Mori** (Pangram Pangram, licence payante pour un usage commercial : prévoir la
licence ou une alternative libre proche comme Inter Tight) et **Geist** (libre).
