# Bouton Like

## Requis

* Node.js v5.8+

## Lancement de l'app de test

1. Installer les dépendances Node.js avec la commande `npm install`.
2. Modifier les deux premières lignes du fichier `public_html/js/all.js` afin que les paramètres pointent vers le serveur Node.js qui va stocker les "Likes".
3. Lancer l'application avec `npm start`. Le serveur démarre sur le port __8888__ par défaut. Pour le changer, il faut modifier le script `start` dans le _package.json_.

Le serveur déploit une API et une page web de test disponible à l'adresse `http://[IP_SERVER]:[PORT_SERVER]/`.

## Technologies utilisées

* Bootstrap v3.3
* jQuery v2.2 
* Vue.js v1.0
* Node.js v5.8
* Gulp (`npm install gulp -g`)

## Tests fonctionnels

Les tests fonctionnels se lancent par la commande `npm test` qui affiche l'exécution des tests.

## Développements

Utiliser la commande `npm run build` pour concaténer tous les fichiers javascript en un seul après les développements.

## Export en production

Pour exporter en production le bouton Like, il suffit seulement d'ajouter le script javascript `public_html/js/all.js`dans le __body__ de la page souhaitée, puis il faut ensuite utiliser le tag `<like></like>` dans le fichier HTML.

```html
<html>
    <body>
        [...]
        <like></like>
        [...]
        <script src="js/all.js"></script>
    </body>
<html>
```

Du coté serveur, il y a juste à reprendre les instructions du chapitre __Lancement de l'app de test__
