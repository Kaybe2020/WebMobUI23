<script setup>
import { computed, ref } from 'vue';
import TheHeader from './components/TheHeader.vue';
import { useFetchJson } from './composables/fetchJson.js';
import { xml } from 'd3';

const pageNb = ref(1);
const url = computed(() => `https://chabloz.eu/files/horaires/all?page=${pageNb.value}`);

// setTimeout(() => { //simule le comportement d'un utilisateur
//     url.value = 'https://chabloz.eu/files/horaires/all';
// }, 2000);



const { data: schedule } = useFetchJson(url); // pas la meilleure place pour mettre l'url car elle peut changer.
//console.log(schedule.value); // retourne null



const showHeader = ref(false); // une ref parce que l'utilisateur va changer les pages

</script>

<template>
    <the-header v-if="showHeader">Horaire IM</the-header>

    <button @click="showHeader = !showHeader">Show header</button> <!--toggle = bascule -->
    <button @click="pageNb--">Previous</button>
    <button @click="pageNb++">Next</button>

    <template v-for="course of schedule">
        <div>
            {{ course.label }}
        </div>
    </template>
</template>
