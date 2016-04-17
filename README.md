# Bouton Like

## Requis

* Node.js v5.8/v5.9

## Lancement de l'app de test

1. Installer les dépendances Node.js avec la commande `npm install`.
2. Modifier le fichier `public_html/js/const.js` afin que les paramètres pointent vers le serveur qui va rendre votre page web.
3. Lancer l'application avec `npm start`. Le serveur démarre sur le port __8888__ par défaut. Pour le changer, il faut modifier le script `start` dans le _package.json_.

## Technologies utilisées

* Bootstrap v3.3
* jQuery v2.2
* Vue.js v1.0
* Node.js v5.8

## Export en production

Pour exporter en production le bouton Like, il suffit d'importer les fichiers javascripts dans le code ci-dessous.
Puis il faut ensuite utiliser le tag `<like></like>` dans le fichier HTML.

```html
<html>
    <body>
        [...]
        <like></like>
        [...]
        <script src="https://code.jquery.com/jquery-2.2.3.min.js" charset="utf-8"></script>
        <script src="https://cdn.jsdelivr.net/vue/latest/vue.js"></script>
        <script src="js/const.js" charset="utf-8"></script>
        <script src="js/like-button.js"></script>
    </body>
<html>
```

Du coté serveur, il y a juste a reprendre les instructions du chapitre __Lancement de l'app de test__
