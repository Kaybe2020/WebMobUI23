<script setup>
import { useLocalStorage } from "./composables/localStorage.js";

// mock data for a Todo List
const { value: todoList } = useLocalStorage('todoList', []);

const { value: search } = useLocalStorage('search', '');

// add a new todo item
setTimeout(() => {
    todoList.value.push({ id: 4, text: "Learn Vue 3 Composition API", done: false });
    // todoList.value = [...todoList.value]; // create a new array to trigger the watch
}, 2000);

// modify a done state of the 2 task
setTimeout(() => {
    todoList.value[1].done = true;
    // todoList.value = [...todoList.value]; // create a new array to trigger the watch
}, 4000);

</script>

<template>
    <div>
        <h1>Todo List</h1>
        <input type="text" v-model="search" placeholder="Search..." />
        <ul>
            <li v-for="todo of todoList">
                {{ todo.text }}
            </li>
        </ul>
    </div>
</template>

<style scoped></style>