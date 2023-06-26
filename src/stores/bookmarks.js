import { ref } from 'vue';
import { useLocalStorage } from "../composables/localStorage.js";

export const { value: bookmarks } = useLocalStorage('bookmarks', []);
// export const bookmarks = ref([]); // car une seule propriété
// comme on n'est pas en timeScript, je ne peux pas dire quelle sorte de données je veux dans mon tableau


//exporter aussi les fonctions qui vont manipuler les données
export function add({ label, url, tags }) { // on lui passe ce dont il a besoin (identifié dans diagramme de classe)
    // on vérifie que les données sont bien présentes ( pasforcément ce qu'il y a de mieux à faire car c est du forcing)
    //if (!label || !url || !tags) return console.log('label and url and tags are required'); // si label ou url est manquant, on ne fait rien
    bookmarks.value.push({ label, url, tags });
    // console.log(bookmarks.value);
}

export function removeByIndex(index) { // on lui passe l'index de l'élément à supprimer
    bookmarks.value.splice(index, 1);// splice supprime un élément à partir d'un index
}

export function remove(bookmark) {
    const index = bookmarks.value.indexOf(bookmark); // indexOf retourne l'index de l'élément dans le tableau
    removeByIndex(index); // on appelle la fonction removeByIndex
} // ici cela ne supprime pas les doublons

export function update(bookmark, newBookmark) { // écrase l'actuel avec le futur
    const index = bookmarks.value.indexOf(bookmark);
    bookmarks.value.splice(index, 1, newBookmark);
} // le update c est comme si on faisait un delete et un add

export function validate(bookmark) {
    const index = bookmarks.value.indexOf(bookmark);
    bookmarks.value[index].validated = true;
}
