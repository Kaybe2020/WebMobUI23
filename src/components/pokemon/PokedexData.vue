<script setup>

// importer les données depuis une adresse urlPokemon au format json
import { ref, onMounted, computed } from 'vue';
import PokemonDetails from './PokemonDetails.vue';
// import { fetchDataPokemon } from '../../composables/fetchDataPokemon.js';
// import { add as addPokemon,  remove, removeChen, show } from '../../stores/pokemons.js';


const urlPokemon = 'https://pokeapi.co/api/v2/pokemon?limit=151'; // URL de l'API PokeAPI pour les 151 Pokémon de la région de Kanto

const showPokemonDetails = ref(false); // on crée un flag pour afficher ou non le formulaire

const selectedPokemon = ref(null); // on crée une variable pour stocker les données du pokemon sélectionné (pour pokemonDetails.vue)

const filterBy = ref(''); // on crée un filtre pour les noms, numero et types de pokemons
// computed pour filtrer les pokemons dans la liste du pokedex
const filteredPokedex = computed(() => pokedex.value.filter(pokemon => {
    return pokemon.name.toLowerCase().includes(filterBy.value.toLowerCase()) || pokemon.id.toString().includes(filterBy.value) || pokemon.types.toLowerCase().includes(filterBy.value.toLowerCase());
}));
// computed pour filtrer les pokemons dans la liste de mes pokemons
const filteredMyList = computed(() => myPokemonList.value.filter(pokemon => {
    console.log(pokemon);
    return pokemon.name.toLowerCase().includes(filterBy.value.toLowerCase()) || pokemon.id.toString().includes(filterBy.value) || pokemon.types.toLowerCase().includes(filterBy.value.toLowerCase());
}));
// computed pour filtrer les pokemons dans la liste de pokemons envoyés au professeur Chen
const filteredChen = computed(() => sendToChen.value.filter(pokemon => {
    console.log(pokemon);
    return pokemon.name.toLowerCase().includes(filterBy.value.toLowerCase()) || pokemon.id.toString().includes(filterBy.value) || pokemon.types.toLowerCase().includes(filterBy.value.toLowerCase());
}));

const pokedex = ref([]);
const myPokemonList = ref([]);
const sendToChen = ref([]);

onMounted(() => { // permet de récupérer les données du localStorage au chargement de la page (n'écrase plus les données)
    pokedex.value = JSON.parse(localStorage.getItem('pokedex')) || [];
    myPokemonList.value = JSON.parse(localStorage.getItem('myPokemons')) || [];
    sendToChen.value = JSON.parse(localStorage.getItem('sendToChen')) || [];
});

// défini une emit pour pour faire descendre l'information de la fermeture du modal
const emits = defineEmits(['close'])

const props = defineProps({
    mode: {
        type: String,
        required: false,
        default: 'pokedex',
        validator: (value) => ['pokedex', 'mesPokemons', 'profChen'].includes(value),
    },
});

// watch([showPokemonDetails], () => {
//     showPokedex.value = !(showPokemonDetails);
// });

//ajout pokemon
function addPokemon(pokemon) {
    myPokemonList.value = [...myPokemonList.value, pokemon]; // concaténation pour pas écraser les données
    // console.log("Pokemon " + pokemon.name + " ajouté à la liste");
    document.getElementById("message").innerHTML = pokemon.name + " has been added to your pokemons";
    localStorage.setItem('myPokemons', JSON.stringify(myPokemonList.value)); // !! Important de mettre ce code ici sinon l'ajout au localStorage ne se fait pas !!
}

//efface pokemon
function removePokemon(pokemon) {
    // Trouver l'index du Pokémon à supprimer dans myPokemonList
    const index = myPokemonList.value.findIndex(p => p.id === pokemon.id);
    // Supprimer le Pokémon du tableau myPokemonList en utilisant splice
    myPokemonList.value.splice(index, 1);
    // console.log("Pokemon " + pokemon.name + " supprimé de la liste");
    document.getElementById("message").innerHTML = pokemon.name + " has been removed";
    localStorage.setItem('myPokemons', JSON.stringify(myPokemonList.value));
}

//envoyer pokemon au professeur Chen
function removeChen(pokemon) {
    sendToChen.value = [...sendToChen.value, pokemon];
    localStorage.setItem('sendToChen', JSON.stringify(sendToChen.value));
    console.log("Pokemon " + pokemon.name + " envoyé au professeur Chen");
    removePokemon(pokemon);
    document.getElementById("message").innerHTML = pokemon.name + " has been sent to teacher Chen"; // placé là sinon c'est message removePokemon qui s'affiche
}


// pour boutons
function cancel() {
    emits('close');
}

fetch(urlPokemon)
    .then(response => response.json())
    .then(data => {
        const pokemonData = data.results;

        const promises = pokemonData.map(pokemon => { // map permet de créer un nouveau tableau avec les données récupérées
            return fetch(pokemon.url)
                .then(response => response.json());
        });

        // récupérer les données de type des Pokémon avant de pouvoir extraire d'autres informations, telles que les faiblesses, 
        //qui dépendent de ces données.
        Promise.all(promises)
            .then(pokemonDetails => {
                const typePromises = pokemonDetails.map(pokemon => {
                    return fetch(pokemon.types[0].type.url)
                        .then(response => response.json());
                });

                Promise.all(typePromises)
                    .then(typeData => {
                        const updatedpokedex = pokemonDetails.map((pokemon, index) => {
                            const { name, id, types, sprites, moves, stats } = pokemon;
                            const typeNames = types.map(type => type.type.name).join(", "); // Utilisation de join() pour concaténer les noms des types
                            const imageUrl = sprites.front_default;
                            const attacks = moves.map(move => move.move.name);
                            // Obtenir les types de Pokémon qui sont forts contre le Pokémon actuel
                            const weaknesses = typeData[index].damage_relations.double_damage_from // cette ligne permet de récupérer les types de pokémon qui font le double de dégâts contre le pokemon actuel
                                .map(type => type.name) // cette ligne permet de récupérer les noms des types avec map et de les mettre dans un tableau
                                .filter(type => !types.some(t => t.type.name === type)); // cette ligne permet de filtrer les types qui sont déjà présents  =  faiblesses spécifiques du Pokémon
                            const hp = pokemon.stats[0].base_stat;
                            const atk = pokemon.stats[1].base_stat;
                            const def = pokemon.stats[2].base_stat;

                            return { name, id, types: typeNames, imageUrl, attacks, weaknesses, hp, atk, def };
                        });

                        pokedex.value = updatedpokedex;
                        // console.log(pokedex.value);
                        // envoyer les données dans le localSotrage seulement si le tableau est vide sinon envoyer un message
                        if (localStorage.getItem('pokedex') === null) {
                            localStorage.setItem('pokedex', JSON.stringify(pokedex.value));
                        } else {
                            // console.log('Pokedex is already in localStorage');
                            pokedex.value = JSON.parse(localStorage.getItem('pokedex'));
                        }
                    });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des données des Pokémon', error);
            });
    });
</script>

<template>
    <PokemonDetails v-if="showPokemonDetails" @close="showPokemonDetails = false" mode="pokemonDetails"
        :pokemonData="selectedPokemon" :pokedexData="pokedex"></PokemonDetails>
    <!-- :pokemonDetails => on va transmettre l'information à pokemonDetails.vue-->
    <div v-if="!showPokemonDetails">
        <div id="entete">
            <button type="button" @click="cancel()" id="close">X</button>
            <p id="message"></p>

            <!-- Champ de recherches -->
            <div id="recherche">
                <label>Filter by : </label>
                <input type="text" v-model="filterBy" autofocus />
            </div>
        </div>

        <ul>
            <!--pokemon dans filteredPokemon à la place de pokedex-->
            <li v-if="mode == 'pokedex'" v-for="pokemon in filteredPokedex" :key="pokemon.id"
                @click.prevent=" showPokemonDetails = true, selectedPokemon = pokemon;">
                <!--on passe les données que lon veut dans selectedPokemon et c est pokemon possède ttes ces données-->
                <!--:key permet de donner une clé unique à chaque élément de la liste  -->
                <h3>{{ pokemon.name }}</h3>
                <p>N° {{ pokemon.id }}</p>
                <img :src="pokemon.imageUrl" /> <!--:src est un raccourci pour v-bind:src -->

                <div>
                    <button @click.prevent.stop="addPokemon(pokemon)"> + </button>
                    <!-- .stop permet de ne pas faire remonter l'information au parent = n ouvre pas pokemonDetail-->
                </div>
            </li>

            <li v-if="mode == 'mesPokemons'" v-for="(pokemon, index) in filteredMyList" :key="index">
                <!-- index pour récupérer la valeur du tableau (parce qu'ici fonctionne pas car plusieurs meme pokemons avec meme id peuvent etre capturés)  -->
                <h3>{{ pokemon.name }}</h3>
                <p>N° {{ pokemon.id }}</p>
                <img :src="pokemon.imageUrl" />

                <div>
                    <button @click.prevent="removeChen(pokemon)"> C </button>
                    <button @click.prevent="removePokemon(pokemon)"> - </button>
                </div>
            </li>

            <li v-if="mode == 'profChen'" v-for="(pokemon, index) in filteredChen" :key="index">
                <h3>{{ pokemon.name }}</h3>
                <p>N° {{ pokemon.id }}</p>
                <img :src="pokemon.imageUrl" />
            </li>
        </ul>
    </div>
</template>

<style scoped>
#entete {
    display: flex;
    flex-wrap: wrap;


}

#recherche {
    width: 300px;
    margin-left: 7%;
    margin-top: 20px;
}

#message {
    margin-top: 2%;
    width: 300px;
    margin-left: 35%;
    margin-top: 20px;
    text-align: center;
    color: blue;
}

#close {
    width: 40px;
    height: 40px;
    margin-left: 82%;
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

ul {
    width: 100%;
    padding: 5% 10%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
}

li {
    width: 80px;
    height: 100px;
    list-style: none;
    margin: 1rem;
    padding-top: 0.5rem;
    display: flex;
    text-align: center;
    background-color: #ef1d1d;
    color: whitesmoke;
    font-size: 0.6rem;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;
}

li img {
    width: 50px;
    height: 50px;
    margin: auto;
}

li:hover {
    background-color: #af1414;
    color: rgb(240, 203, 203);
    transition: 0.5s;
}

button {
    width: 20px;
    height: 20px;
    color: #ef1d1d;
    font-size: 1rem;
    align-items: center;
    margin: 0 0.6rem;
}
</style>