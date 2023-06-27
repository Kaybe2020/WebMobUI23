<script setup>
import { ref, onMounted } from 'vue';
import { remove } from '../../stores/movies.js'


//créer un tableau favoris dans localStorage
const favoris = ref(JSON.parse(localStorage.getItem('favoris')) || []);

//adresse affiche des films
const urlAffiche = '  https://chabloz.eu/movies/thumb/?id=';

// film avec affiche
const afficheFilm = ref(urlAffiche + props.movie.id);

// prendre les données fetch de AppMovies
// const props = await (defineProps(AppMovies));

defineProps({
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
});

// récupérer les données du localStorage
const moviesLocalStorage = ref(JSON.parse(localStorage.getItem('movies')) || []);
console.log(moviesLocalStorage.value);

// couleur du coeur favoris
const isFavoris = ref(false);
function color() {
    if (isFavoris == 'true') {
        // if (props.movie.id == favoris.value.id) {
        color.value = 'red';
    } else {
        color.value = 'black';
    }
}


// afficher affiche du film
const affiche = ref(urlAffiche.replace('XXX', props.movie.id));
// console.log(affiche.value);

// défini une emit pour pour faire monter l'information (enfant vers parent)
const emits = defineEmits(['affiche'])

onMounted(() => { // permet de récupérer les données du localStorage au chargement de la page (n'écrase plus les données)
    favoris.value = JSON.parse(localStorage.getItem('favoris')) || [];
})


// ajouter ou non film en favoris
function favorite(movie) {
    // si le movie n'est pas dans le tableau favoris, on l'ajoute
    if (!favoris.value.includes(movie)) {
        favoris.value = [...favoris.value, movie];
        localStorage.setItem('favoris', JSON.stringify(favoris.value));
        isFavoris.value = true;
    } else {
        const index = favoris.value.findIndex(m => m.id === movie.id);
        favoris.value.splice(index, 1);
        localStorage.setItem('favoris', JSON.stringify(favoris.value));
        isFavoris.value = false;
    }
}
</script>
<template>
    <p v-if="isFavoris == 'false'">❤</p>
    <img :src="affiche" />

    <li v-if="mode == 'texte'" :key="movie.id">
        <button @click.prevent="favorite(movie)" id="coeur"> ❤ </button>
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.description }}</p>
    </li>

    <li v-if="mode == 'affiche'" v-for="movie in movies" :key="movie.id">
        <img :src="afficheFilm" />
        <button @click.prevent="favorite(movie)" id="coeur"> ❤ </button>
    </li>
</template>

<style scoped></style>