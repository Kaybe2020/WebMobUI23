<script setup>
import { useFetchJson } from './composables/fetchJson.js';
import MovieEntry from './components/movies/MovieEntry.vue';
import { ref, computed, watch } from 'vue';
import { useLocalStorage } from './composables/localStorage';

//chercher le tableau favoris dans localStorage
const favoris = ref(JSON.parse(localStorage.getItem('favoris')) || []);


const showAffiche = ref(true);

// importation des données
const url = ' https://chabloz.eu/movies/';
const { data: fetchMovies } = useFetchJson(url);
const movies = ref([]);
// on push les films dans le tableau movies
watch(fetchMovies, (() => {
    movies.value.push(...fetchMovies.value);
    console.log(movies.value);
    // envoie les données dans le local storage
    useLocalStorage('movies', movies.value);
}));


// pour barre de recherches
const filterBy = ref(''); // on crée un filtre pour les tags
const filteredMovies = computed(() =>
    movies.value.filter(movie => {
        return movie.title.toLowerCase().includes(filterBy.value.toLowerCase()
        );
    }));
const orderedMovies = computed(() => {
    return filteredMovies.value.sort((a, b) => {
        return a.title.localeCompare(b.title); // tri par ordre alphabétique
    });
});

// passer les données de movies à MovieEntry (parent vers enfant)
const props = defineProps({
    movie: {
        type: Object,
        required: true,
    },
    orderedMovies: {
        type: Array,
        required: true,
    },

    mode: {
        type: String,
        required: true,
        default: 'image',
        validator: (value) => ['image', 'texte'].includes(value),
    },

    modelValue: {
        type: Boolean,
        required: true,
    },
    
});


//récupérer l'emit
function afficher() {
    emits('affiche');
}

// si il y a un mouseover, afficher le mode texte
function mouseOver() {
    // si il y a un mouseover, afficher le mode texte
    if (mode == 'image') {
        mode == 'texte';
        showAffiche.value = false;
    mode =='texte';
    afficher(); // affiche les données texte de l enfant
    } else {
        mode == 'image';
        showAffiche.value = true;
    }    
}

</script>

<template>
    <!-- 1) CHAMP DE RECHERCHES-->
    <div>
        <label> </label>
        <input type="text" v-model="filterBy" placeholder="Search movies" autofocus />
    </div>

    <!-- 2) FILMS-->
    <!--Affiche les films avec un v-for-->
    <MovieEntry v-if="mouseOver" v-for="movie of orderedMovies" :movie="movies" mode="image" @affiche="showAffiche"></MovieEntry>
    <!--  -->


    <!--3) FAVORIS-->
    <!--Affiche les favoris avec un v-for-->
    <MovieEntry v-if="mouseOver" v-for="movie of favoris" :movie="movies" mode="image" @affiche="showAffiche"></MovieEntry>
 
</template>

<style scoped></style>
