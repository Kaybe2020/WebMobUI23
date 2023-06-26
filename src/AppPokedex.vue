<script setup>
import { ref, watch } from 'vue';
import ThePokemonHeader from './components/pokemon/ThePokemonHeader.vue';
import PokedexData from './components/pokemon/PokedexData.vue';

const showPokedex = ref(false); // on crée un flag pour afficher ou non le formulaire
const showMesPokemons = ref(false);
const showDocChen = ref(false);
const showHome = ref(true);

// regarder si un des flags est à true et mettre showHome à false
watch([showPokedex, showMesPokemons, showDocChen], () => {
  showHome.value = !(showPokedex.value || showMesPokemons.value || showDocChen.value);
});
</script>

<template>
  <ThePokemonHeader></ThePokemonHeader>

  <PokedexData v-if="showDocChen" @close="showDocChen = false" mode="profChen"></PokedexData>
  <PokedexData v-if="showPokedex" @close="showPokedex = false" mode="pokedex"></PokedexData>
  <PokedexData v-if="showMesPokemons" @close="showMesPokemons = false" mode="mesPokemons"></PokedexData>

  <div v-if="showHome">
    <button @click="showDocChen = true" id="chen">Dr.Chen</button>

    <div id="body">
      <button @click="showPokedex = true">Pokedex</button>
      <button @click="showMesPokemons = true">My pokemons</button>
    </div>
  </div>
</template>

<style scoped>
#chen {
  width: 100px;
  height: 40px;
  margin-left: 70%;
  background-color: blue;
  font-family: 'Segoe UI', Tahoma, sans-serif;
  font-size: 20px;
  color: white;
  border: none;
  justify-content: center;
  border-radius: 12%;
}

#chen:hover {
  background-color: #0d0d61;
  color: rgb(203, 215, 240);
  transition: 0.5s;
}

#body {
  width: auto;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

body button {
  width: 200px;
  height: 200px;
  margin: 0 10%;
  background-color: #ef1d1d;
  color: white;
  border: none;
  font-family: 'pokemon';
  font-size: 30px;
  letter-spacing: 3px;
  justify-content: center;
  border-radius: 7%;
}

body button:hover {
  background-color: #af1414;
  color: rgb(240, 203, 203);
  transition: 0.5s;
}


@font-face {
  font-family: "Pokemon";
  src: url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.eot");
  src: url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.eot?#iefix") format("embedded-opentype"),
    url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.woff2") format("woff2"),
    url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.woff") format("woff"),
    url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.ttf") format("truetype"),
    url("//db.onlinewebfonts.com/t/f4d1593471d222ddebd973210265762a.svg#Pokemon") format("svg");
}

/***************************************************************************************************************************
MARCHE A SUIVRE
****************************************************************************************************************************
1) Ne pas oublier de changer le lien dans main.js
2) NE pas oublier de vider le storage du navigateur (Application / LocalStorage / clic droit / clear)
3) Enlever les éléments existants dans le fichier App.vue (pour construire de 0)
4) Faire la maquette de l'application
5) Créer les éléments sur la page home (= App.vue) dans le template
6) créer ThePokemonHeader.vue dans components / pokemon et l'importer dans AppPokedex.vue
7) mettre les éléments utiles à AppPokedex.vue dans le template dans template
8) créer PokedexData.vue dans components / pokemon et l'importer dans AppPokedex.vue
9) Lier les boutons à la page PokedexData.vue avec la technique des pages
    a. Dans AppPokedex.vue, créer une variable page et lui donner la valeur 'home'
    b. Mettre les .prevent sur les boutons
10) S'occuper du bouton ajout. Faire la fonction ajout dans PokedexData.vue pour que le pokemon aille dans le bon tableau du localStorage
    a. Mettre onMounted au début du script pour ne pas écraser les données au rajout d'un pokemon
11) S'occuper de "My pokemons".
  => c'est un affichage qui se fait comme le pokedex, mais avec un tableau différent
  => On peut reprendre les bases de PokedexData.vue en lui passant un autre mode
    a. ajouter le mode au bouton dans AppPokedex.vue
    => on peut utiliser le même composant PokedexData.vue
    b. Bien mettre le bon mode partout dans PokedexData.vue
    => pour afficher les pokemons du tableau MesPokemons faire attention à :
    !! transmettre la valeur du mode à PokedexData.vue (sinon mode par défaut = 'pokedex')
       -> passer la valeur avec une props. Sur les 2 boutns de AppPokedex.vue ajouter :mode="ChoisirNomBonMode"
12) S'occuper d'envoyer au prof Chen
       -> Rajouter un mode 'docChen' dans PokedexData.vue
       -> passer la valeur avec une props. Sur lebouton de AppPokedex.vue ajouter :mode="docChen"
       -> copier les li dans le template de PokedexData.vue et changer les valeurs pour que ça corresponde à docChen sur le bon tableau responsif
       -> bien mettre pokemon ici : <button @click.prevent="removeChen(pokemon)"> C </button>
       => si les pokemons ne s'affichent pas : vérifier que le mode sur le li est le bon !!!




*/
</style>
