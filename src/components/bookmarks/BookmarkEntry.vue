<script setup>
import { ref } from 'vue';
import { remove } from '../../stores/bookmarks.js';
import BookmarkForm from './BookmarkForm.vue';

defineProps({
    bookmark: Object
});

const showForm = ref(false);
</script>

<template>
    <div>
        <a :href="bookmark.url" target="_blank">{{ bookmark.label }}</a>
    </div>
    <div>
        {{ bookmark.tags }}
    </div>
    <div>
        <button @click="remove(bookmark)">Remove</button>
        <button @click="showForm = true">Modify</button>
        <!-- texte pas très parlant car on pourrait avoir des icones à la place -->

        <bookmark-form v-if="showForm" @close="showForm = false" mode="edit" :bookmark="bookmark" />
    </div>
</template>

<style scoped></style>