<script setup>
import { computed, ref, watchEffect } from 'vue';
import BaseInputNumber from './components/base/BaseInputNumber.vue';
import BaseMessage from './components/base/BaseMessage.vue';


// Mon premier test
// function updatesourceVerite(event) {
//     sourceVerite.value = event.target.value;
// }

// // mise à jour de la source de vérité en fonction de la source C
// function updateSourceC(event) {
//     sourceVerite.value = sourceC.event + 273.15;
// };

// // mise à jour de la source de vérité en fonction de la source F
// function updateSourceF(event) {
//     sourceVerite.value = (sourceF.event + 459.67) * 5 / 9;
// };


/******************Définir les différentes unités de mesure****************************************************/
const decimalPlaces = 2;
const sourceVerite = ref(0) // ici la source de vérité est l'unité kelvin
//On écrit les computed en général avec un get et un set
// les computed servent à calculer des valeurs à partir de valeurs d'autres computed ou de ref
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


// watchEffect permet de déclencher une fonction à chaque fois que l'une des valeurs observées change
watchEffect(() => {
    console.log(sourceVerite.value);
    console.log(sourceC.value);
    console.log(sourceF.value);
})


</script>


<!-- ******** Template ******************************************** -->
<template>
    <!-- Mon premier essai-->
     <!-- <label>Kelvin </label>
    <input type="number" :value="sourceVerite" @input="updatesourceVerite($event)" />

        <label> Celcius </label>
        <input type="number" :value="sourceC" @input="updateSourceC($event)" />

        <label> Fahrenheit </label>
        <input type="number" :value="sourceF" @input="updateSourceF($event)" /> -->


    <!-- Messages d'erreur-->
    <base-message data-role="error">
        Error: please try again later
    </base-message>
    <base-message data-role="warning">
        Application will be in maintenance...
    </base-message>

    <!-- créer input sur la baseInputNumber-->
    <base-input-number label="Kelvin" unit="K" v-model="sourceVerite" :decimal-places="decimalPlaces" />
    <!-- sourceVerité car mon kelvin est appelé comme cela dans BaseInputNumber 
    :decimal-places  permet de ne pas avoir une chaine de caractère mais un nombre (exception car sinon ce n'est que pour les variables les :)
    A la place de 2 on pourrait par exemple mettre 4 pour avoir plus de précision machine
    Comme c'est un chiffre qui revient plusieurs fois, on peut changer le numéro pour une variable afin de ne pas figer le code (ici le 2 est remplacé par decimalPlaces)-->

    <base-input-number label="Celsius" unit="°C" v-model="sourceC" :decimal-places="decimalPlaces" />
    <!-- sourceC car mon celsius est appelé comme cela dans BaseInputNumber -->

    <base-input-number label="Fahrenheit" unit="°F" v-model="sourceF" :decimal-places="decimalPlaces" />
    <!-- sourceF car mon fahrenheit est appelé comme cela dans BaseInputNumber -->
</template>


<!-- ******** Style *********************************************** -->
<style scoped>
/* scoped signifie que le style ne s'applique qu'au composant et pas à tout le site */

</style>