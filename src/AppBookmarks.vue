<script setup>
import TheHeader from './components/TheHeader.vue';
import BookmarkEntry from './components/bookmarks/BookmarkEntry.vue';
import BookmarkForm from './components/bookmarks/BookmarkForm.vue';
import { ref, computed } from 'vue';

import { bookmarks, remove, add as addBookmark } from './stores/bookmarks';
console.log(bookmarks.value);

const showForm = ref(false); // on crée un flag pour afficher ou non le formulaire

const filterBy = ref(''); // on crée un filtre pour les tags

const filteredBookmarks = computed(() => {
    return bookmarks.value.filter((bookmark) => {
        return bookmark.tags.toLowerCase().includes(filterBy.value.toLowerCase()); // toLowerCase pour ne pas avoir de soucis de casse min maj
    });
});

const orderedBookmarks = computed(() => {
    return filteredBookmarks.value.sort((a, b) => {
        return a.label.localeCompare(b.label); // tri par ordre alphabétique
    });
});

// Test pour voir si le store bookmarks.js fonctionne
// addBookmark({
//     // ici l'ordre des priorités n'est pas importante
//     label: 'Google',
//     url: 'https://www.google.fr',
//     tags: 'search engine',
// });

// const entry2 = {
//     label: 'Yahoo',
//     url: 'https://www.yahoo.fr',
//     tags: 'search internet',
// };

// addBookmark(entry2);
// console.log(bookmarks.value);

// remove(entry2);
// console.log(bookmarks.value);
</script>

<template>
    <TheHeader>Bookmarks</TheHeader>

    <!-- Champ de recherches -->
    <div>
        <label>Filter by : </label>
        <input type="text" v-model="filterBy" autofocus />
    </div>

    <!-- Permet d'afficher formulaire d'ajout quand clique -->
    <button @click="showForm = true">Add</button>

    <!-- correspond au fichier BookmarkForm.vue, fonctionne avec le flag -->
    <BookmarkForm v-if="showForm" @close="showForm = false" />

    <!-- correspond au fichier bookmarkEntry.vue -->
    <bookmark-entry v-for="bookmark of orderedBookmarks" :bookmark="bookmark" />
</template>