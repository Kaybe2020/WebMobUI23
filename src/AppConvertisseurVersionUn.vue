<script setup>
import { computed, ref } from 'vue';


// 3) Créer une source de vérité et deux computed pour les deux autres unités de mesure

const sourceVerite = ref(0); // référence Kelvin
const celciusValue = computed({
    get() {
        return sourceVerite.value - 273.15; // Kelvin vers Celcius => donné par Google
    },
    set(value) {
        sourceVerite.value = value + 273.15; // Celcius vers Kelvin 
    }
});
const fahrenheitValue = computed({
    get() {
        return sourceVerite.value * 9 / 5 - 459.67; // Kelvin vers Fahrenheit => donné par Google
    },
    set(value) {
        sourceVerite.value = (value + 459.67) * 5 / 9; // Fahrenheit vers Kelvin
    }
});

function majSourceVerite(event) {
    sourceVerite.value = event.target.value; // on met à jour la source de vérité en fonction de la valeur saisie
}


</script>

<template> 
    <!-- 1)créer deux input pour saisir les valeurs à convertir -->
    <label>Celcius</label>
    <input type="number" :value="celciusValue">
    <label>Fahrenheit</label>
    <input type="number" :value="fahrenheitValue">
    <label>Kelvin</label>
    <input type="number" :value="sourceVerite" @input="$event => majSourceVerite($event)">
</template>

<style scoped>
/* On met scoped pour que le style ne soit appliqué que sur ce composant */
/* 2) Faire un minimum de CSS */

* {
    display: block;
}

label {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
}
</style>