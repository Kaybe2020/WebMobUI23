<script setup>
import { tasks, page } from '../../stores/tasks.js'
import { ref, computed } from 'vue';

const search = ref('');

const filteredTasks = computed(() => {
    return tasks.value.filter(task => task.name.includes(search.value));
});
</script>

<template>
    <input type="texte" placeholder="search" v-model="search" />
    <button @click="page = 'add'">add</button>
    <ul>
        <li v-for="task in filteredTasks">
            {{ task.name }}
        </li>
    </ul>
</template>

<style scoped>
input {
    display: block;
    margin: 10px 0;
}
</style>