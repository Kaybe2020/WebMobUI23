<script setup>
import { ref } from 'vue';

const props = defineProps({
    pokemonData: {
        type: Object, // Le type d'objet peut être ajusté en fonction de la structure des données
        default: null,
    },
    pokedexData: {
        type: Array,
        required: true,
    },
    mode: {
        type: String,
        required: false,
        default: 'pokedex',
    },
});


const emits = defineEmits(['close']) // pour le bouton close <-- FAIRE UN BASE BUTTON
const pokemonId = ref(props.pokemonData.id); // on crée une variable pour stocker l'id du pokemon sélectionné
const selectedPokemon = ref(props.pokemonData); //pour push le pokemon et pouvoir avancer reculer
const pokedex = ref(props.pokedexData); // pour acceder en tout temps au pokedex en entier

function next() {
    // console.log("next");
    if (pokemonId.value < pokedex.value.length) { // si 151 < 151, on entre pas
        pokemonId.value++;
        selectedPokemon.value = pokedex.value[pokemonId.value - 1]; // -1 car pas de pokemon à l'id 0!
    }
}

function previous() {
    console.log("previous");
    if (pokemonId.value > 0) { // si 151 < 151, on entre pas
        pokemonId.value--;
        selectedPokemon.value = pokedex.value[pokemonId.value - 1]; // -1 car pas de pokemon à l'id 0!
    }
}

</script>

<template>
    <div>
        <div id="btns">
            <button @click.prevent="previous" class="buttonPkn"> previous </button>
            <button @click.prevent="next" class="buttonPkn"> next </button>
            <button @click="emits('close')" id="close"> X </button>
        </div>
        <div v-if="mode == 'pokemonDetails'" id="fiche">
            <img :src="selectedPokemon.imageUrl" />
            <h3>{{ selectedPokemon.name }}</h3>
            <p><b>N°</b> {{ selectedPokemon.id }}</p>
            <p><b>HP</b> {{ selectedPokemon.hp }}</p>
            <p><b>ATK</b> {{ selectedPokemon.atk }}  <b>DEF</b> {{ selectedPokemon.def }} </p>
            <p><b>Type :</b> {{ selectedPokemon.types }}</p>
            <p><b>weaknesses :</b> {{ selectedPokemon.weaknesses }}</p>
            <p><b>Attacks :</b> {{ selectedPokemon.attacks }}</p>

        </div>
    </div>
</template>

<style scoped>
#btns {
    width: 70%;
    display: flex;
    justify-content: space-around;
    margin-left: 20%;
}

.buttonPkn {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 12%;
    justify-content: center;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    font-size: 20px;
    background-color: #ef1d1d;
    color: white;
}

.buttonPkn:hover {
    background-color: #af1414;
    color: rgb(240, 203, 203);
    transition: 0.5s;
}

#close {
    width: 40px;
    height: 40px;
    /* margin-left: 82%; */
    background-color: blue;
    font-family: 'Segoe UI', Tahoma, sans-serif;
    font-size: 20px;
    color: white;
    border: none;
    justify-content: center;
    border-radius: 12%;
}

#close:hover {
    background-color: #0d0d61;
    color: rgb(203, 215, 240);
    transition: 0.5s;
}

#fiche {
    display: flex;
    flex-direction: column;
    align-items: center;
}

img {
    width: 20%;
    height: auto;
    margin:5px 0px;
}

p {
    margin: 0.5% 10%;}

h3 {
    color: #ef1d1d;
}
</style>