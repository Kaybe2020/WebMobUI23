<script setup>
import { computed, ref } from 'vue';
// 4) Importer le fichier BaseInput.vue
import BaseInput from './base/BaseInput.vue';

//10) Définir une constante decimalPlaces pour rendre le code plus souple
const decimalPlaces = 2;

//7) Créer une constante ref pour que la donnée dynamique soit transmise aux enfants
const sourceVerite = ref(0); // référence Kelvin

// 8) créer une computed pour chaque unité de mesure
const sourceC = computed({
    // get permet de définir la valeur de la computed à partir de la valeur de la source de vérité
    get() {
        return sourceVerite.value - 273.15;
    },
    // set permet de définir la valeur de la source de vérité à partir de la valeur de la computed 
    set(value) {
        sourceVerite.value = value + 273.15;
    }
});

const sourceF = computed({
    get() {
        return sourceVerite.value * 9 / 5 - 459.67;
    },
    set(value) {
        sourceVerite.value = (value + 459.67) * 5 / 9;
    }
});
</script>

<template>

    <!-- 1) Créer une div personnalisée pour l'input-->
    <BaseInput label="Kelvin" unit="K" v-model="sourceVerite" :decimal-places="decimalPlaces" />

    <BaseInput label="Celsius" unit="°C" v-model="sourceC" :decimal-places="decimalPlaces" />
    <!-- sourceC car mon celsius est appelé comme cela dans BaseInputNumber -->

    <BaseInput label="Fahrenheit" unit="°F" v-model="sourceF" :decimal-places="decimalPlaces" />
    <!-- sourceF car mon fahrenheit est appelé comme cela dans BaseInputNumber -->
</template>

<style scoped>
/* On met scoped pour que le style ne soit appliqué que sur ce composant */
</style>