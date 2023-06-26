<script setup>
import TheHeader from './components/tasks/TheHeader.vue'
import TheTasksList from './components/tasks/TheTasksList.vue'
import TheTasksFormAdd from './components/tasks/TheTasksFormAdd.vue'
import { page } from './stores/tasks.js'
</script>

<template>
    <TheHeader />
    <the-tasks-form-add v-if="page === 'add'" /> <!-- Avec un v-if c'est une manière barbare -->


    <The-tasks-List />
</template>