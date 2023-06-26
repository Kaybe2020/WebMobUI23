<script setup>
// scoped car on utilise la vue composition 
import BaseButton from './BaseButton.vue';
import { jeuRoles, page, indexPersoSelect } from '../../stores/jeuRoles/localStorageJR.js';



</script>
<template>
    <BaseButton @click="page = 'creation'">Créer personnage</BaseButton>
    <BaseButton @click="page = 'personnage', indexPersoSelect = index" v-for="(personnage, index) in jeuRoles">
        {{ personnage.nom }}</BaseButton>
</template>

<style scoped>
/* scoped pour mettre le style que sur ce composant */
</style>