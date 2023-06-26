<script setup>
import TheHeader from './components/TheHeader.vue';
import ZoneRedirection from './components/rp/ZoneRedirection.vue';
import CreationPerso from './components/rp/CreationPerso.vue';
import { page } from './stores/jeuRoles/localStorageJR.js';

</script>

<template>
    <TheHeader>Feuilles de personnages</TheHeader>

    <CreationPerso v-if="page == 'creation' || page == 'personnage'" />
    <ZoneRedirection v-if="page == 'home' || page == ''" />
</template>

<style scoped></style>
