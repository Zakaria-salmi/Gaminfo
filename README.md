# Game Info Viewer

Game Info Viewer est une application web qui permet aux utilisateurs de rechercher des jeux vidéo et de consulter des informations détaillées à leur sujet, y compris des bandes-annonces, des captures d'écran, des informations sur les développeurs, les genres, les évaluations et où les acheter.

## Fonctionnalités

-   Rechercher des jeux vidéo par nom
-   Voir des informations détaillées sur les jeux, y compris la date de sortie, les plateformes, le développeur, les genres, les évaluations et le metascore
-   Regarder des bandes-annonces de jeux
-   Voir des captures d'écran de jeux dans une visionneuse
-   Voir où acheter le jeu dans divers magasins

## Technologies utilisées

-   Vue.js
-   Axios
-   Vue-Easy-Lightbox
-   Font Awesome

## Installation

Pour configurer ce projet localement, suivez ces étapes :

### Prérequis

-   Node.js et npm installés sur votre machine
-   Une clé API de [RAWG.io](https://rawg.io/apidocs)

### Étapes

1. **Cloner le dépôt :**

    ```bash
    git clone https://github.com/Zakaria-salmi/Gaminfo.git
    cd game-info-viewer
    ```

2. **Installer les dépendances :**

    ```bash
    npm install
    ```

3. **Créer un fichier `.env` :**

    Créez un fichier `.env` à la racine de votre projet et ajoutez ce qui suit :

    ```bash
    API_KEY=YOUR_API_KEY_HERE
    PORT=3000
    ```

4. **Lancer le serveur de développement :**

    ```bash
    npm run dev
    ```

    L'application devrait maintenant fonctionner sur `http://localhost:3000`.

## Utilisation

1. Ouvrez votre navigateur et allez sur `http://localhost:3000`.
2. Entrez le nom du jeu que vous souhaitez rechercher dans la barre de recherche et appuyez sur entrée ou cliquez sur le bouton de recherche.
3. Consultez des informations détaillées sur le jeu, regardez les bandes-annonces, voyez les captures d'écran et découvrez où acheter le jeu.

## Contribuer

Si vous souhaitez contribuer à ce projet, veuillez forker le dépôt et soumettre une pull request. Pour des changements majeurs, veuillez ouvrir une issue d'abord pour discuter de ce que vous aimeriez changer.

## Licence

Ce projet est sous licence MIT.

## Remerciements

-   [RAWG.io](https://rawg.io/apidocs) pour fournir l'API des données de jeu
-   [Vue.js](https://vuejs.org/)
-   [Axios](https://axios-http.com/)
-   [Vue-Easy-Lightbox](https://github.com/XiongAmao/vue-easy-lightbox)
-   [Font Awesome](https://fontawesome.com/)
