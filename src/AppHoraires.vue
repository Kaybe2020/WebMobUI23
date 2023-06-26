<script setup>
import { useFetchJson } from './composables/fetchJson.js';
import { computed, nextTick, ref, watch } from 'vue';

const url = 'https://chabloz.eu/files/horaires/all';
// useFetchJson(url);
//définir constante qui récupère le useFetchJson avec une fonction pozr déconstruire la donnée avec {}
const { data: fetchHoraires } = useFetchJson(url); // on récupèer data et eon le renomme fetchHoraires
const horaires = ref([]); // .value seulement avec ref!!
//faire un watch sur fetchHoraires
watch(fetchHoraires, async () => {
    if (fetchHoraires.value?.length > 0) {
        horaires.value.push(...fetchHoraires.value);
        // tri des cours par date de départ (+ récent au  + loin)
        horaires.value.sort((a, b) => {
            return new Date(a.start) - new Date(b.start);
        });
        await nextTick(); // attend que le DOM soit rendu
    }
})

// extraire la date du jour de start
//1. formater la date en JS
const dateFormat = new Intl.DateTimeFormat('fr-CH', {
    weekday: 'short',
    month: 'numeric',
    day: 'numeric'
});
const dateTimeFormat = new Intl.DateTimeFormat('fr-CH', {
    hour: 'numeric',
    minute: 'numeric'
});

//liste les cours
const cours = computed(() => {
    const coursNom = [];
    horaires.value.forEach(horaire => {
        if (!coursNom.includes(horaire.label) && horaire.label != '') {
            coursNom.push(horaire.label);
        }
    });
    coursNom.sort();// trier les cours par ordre alphabétique
    return coursNom;
});

// filtre les cours
const filterByCour = ref('Tous'); // tous car par défaut
function filteredHoraire(event) {
    filterByCour.value = event.target.value;
    // console.log(filterByCour.value);
}

// filtre historique cours
const filterByTime = ref(false); // tous car par défaut
// watch(filterByTime, () => {
//     console.log(filterByTime.value);
// }); montre ture false


// liste des classes
const IM = computed(() => {
    const classeNom = [];
    horaires.value.forEach(horaire => {
        if (!classeNom.includes(horaire.class)) {
            classeNom.push(horaire.class);
        }
    });
    classeNom.sort();
    return classeNom;
});

// filtre par classe (label)
const filterByClass = ref('toutes');
function filteredClass(event) {
    filterByClass.value = event.target.value;
}

// horaires filtrés
const filteredByCour = computed(() => {
    let horairesAll = horaires.value;
    if (filterByCour.value !== 'Tous') {
        horairesAll = horairesAll.filter(horaire => horaire.label === filterByCour.value);
    }
    if (filterByTime.value !== true) {
        horairesAll = horairesAll.filter(horaire => new Date(horaire.start) >= new Date());
    }
    if (filterByClass.value !== 'toutes') {
        horairesAll = horairesAll.filter(horaire => horaire.class === filterByClass.value);
    }
    return horairesAll;
});
</script>

<template>
    <div class="app-horaires">
        <h1>Horaires</h1>
        <!-- Filtre par classe -->
        <div>
            <button @click="filteredClass" value="toutes" :class="{ active: filterByClass == 'toutes' }">Toutes</button>
            <button v-for="className in IM" @click="filteredClass" :value="className" :class="{ active: filterByClass == className }"> {{ className }} </button>
        </div>

        <!--Filtre par cours-->
        <div>
            <label>Filtrer par cours <select @change="filteredHoraire">
                    <!--change évite le rechargement quand on clique 2x sur le meme cours-->
                    <option>Tous</option>
                    <option v-for="(cour, index) in cours" :key="index">{{ cour }}</option>
                </select></label>
        </div>

        <!-- checkbox -->
        <div>
            <label> Afficher l'historique <input type="checkbox" v-model="filterByTime" /></label>
        </div>

        <ul>
            <li v-for="horaire in filteredByCour" :key="horaire.id">
                <span>{{ dateFormat.format(new Date(horaire.start)).replace(',', '').slice(0, -1) }}</span>
                <!--slice enlève le dernier caractère enlève le . -->
                <span> | </span>
                <span>{{ dateTimeFormat.format(new Date(horaire.start)) }} {{ dateTimeFormat.format(new Date(horaire.end))
                }}</span>
                <span> | </span>
                <span> {{ horaire.label }} {{ horaire.class }}</span>
                <span> | </span>
                <span>{{ horaire.room }}</span>

            </li>
        </ul>
        <p v-if="filteredByCour.length == 0">Aucun résultat pour les filtres sélectionnés</p>
    </div>
</template>

<style scoped>
button.active {
    background-color: rgb(219, 128, 216);
}


/************************************************************************************************************
MARCHE A SUIVRE
*************************************************************************************************************

De zéro : npm create vite@latest my-vue-app --template vue + npm install
sinon :

1) Créer nouveau AppNOMAPP.vue
2) changer le chemin dans main.js
3) mettre les <>
4) charger la donnée dans une constante
5) importer fetchJson
6) faire un fetch de la donnée
7) useFetchJson(url); <- pas besoin on le recup au point 8
8) Récupérer la donnée en JS 
    a. mettre dans une constante le résultat de useFetchJson(url)
    b. créer une ref pour la donnée
    c. watch sur le résultat du fetchJson
9) extraire la date du jour de start
    a. formater la date en JS
    b. créer une constante date
    c. utiliser la constante date dans le v-for  
10) Passer la donnée dans la template
11) faire le filtre par cours
    a. faire la template pour le menu select
    b. créer la fonction de tri afin de n'afficher les cours qu'une fois et par ordre alphabétique
    c. Rajouter l'option "tous"
    c. donner cours à la place de horaires dans le label
    d. renvoyer le cours filtré dans la template
    e. créer la fonction filteredHoraire
    f. donner filteredByCour à la place de horaires dans le v-for
12) Faire le click afficher l historique 
    a. créer un v-model pour le checkbox
    b. créer le filtre avec computed (ajouter dans filtreByCour)
13) Faire les boutons classes (sur la même logique que les cours)
14) changer la couleur du bouton sélectionné en CSS avec ajout dans le boutton : :class="{ active: filterByClass == 'toutes' }"
15) Mettre mot "aucun réslutat" quand rien n'est sélectionné 
    a. créer le p dans la template
    b. mettre la condition dans le p :v-if="filteredByCour.length == 0"


*/
</style>