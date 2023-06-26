<script setup>
import { ref, onMounted } from 'vue';
import { add as addBookmark, update as updateBookmark } from '../../stores/bookmarks.js';


const elLabel = ref(null); // permet de récupérer l'élément du DOM pour faire un autofocus dessus

const emits = defineEmits(['close']); // permet de définir les événements émis par le composant

const props = defineProps({
    bookmark: {
        type: Object,
        required: false,
        default: () => ({
            label: '',
            url: '',
            tags: '',
        }),
    },
    mode: {
        type: String,
        required: false,
        default: 'add',
        validator: (value) => ['add', 'edit'].includes(value),
    },
});

const label = ref(props.bookmark.label);
const url = ref(props.bookmark.url);
const tags = ref(props.bookmark.tags);

function submit() {
    if (props.mode == 'edit') {
        updateBookmark(props.bookmark, {
            label: label.value,
            url: url.value,
            tags: tags.value,
        })
    } else {
        addBookmark({
            label: label.value,
            url: url.value,
            tags: tags.value,
        });
    }
    //console.log("add");
    emits('close'); // on émet l'événement close (voir le fichier AppBookmarks.vue
}

function cancel() {
    // console.log("cancel");
    emits('close');
}

// on fait au autofocus sur le label
onMounted(() => {
    elLabel.value.focus();
});

// onUnmounted(() => { // permet de faire des actions à la destruction du composant
//     // console.log("unmounted");
// });
</script>

<template>
    <!-- .prevent permet de NE PAS faire le comportement par défaut du browser -->
    <form @submit.prevent="submit()">
        <input type="text" placeholder="Label" v-model="label" ref="elLabel" required />
        <input type="url" placeholder="url" v-model="url" required />
        <input type="text" placeholder="Tags" v-model="tags" required />

        <button v-if="mode == 'add'">Add</button>
        <button v-if="mode == 'edit'">Edit</button>
        <button type="button" @click.prevent="cancel()">Cancel</button>
    </form>
</template>

<style scoped>
* {
    display: block;
}
</style>
