import { useLocalStorage } from "../composables/localStorage.js";
import { ref, watch } from "vue";


// pour avoir une variable globale il faut un export
export const { value: tasks } = useLocalStorage('tasks', []); // pour se souvenir de là où il était
//faire cela donne une variable globale que l'on peut importer n'importe où
// la donnée est maintenant réactive et persistante

export const page = ref('home'); // changement utilisateur
// faire la même chose avec le #hash listener de window
window.addEventListener('hashchange', () => {
    page.value = window.location.hash.slice(1); // slice(1) pour enlever le # du hash
}); // cela fait le one way binding

// pour faire le two way binding il faut faire la même chose avec le hashchange
watch(page, (value) => {
    window.location.hash = value;
}); // cela fait le two way binding => changement moi (dans le code on met page = 'home' par exemple) => changement utilisateur (le hashchange est appelé