import { ref } from 'vue';
import { useLocalStorage } from "../composables/localStorage.js";

export const { value: movies } = useLocalStorage('movies', []);
// export const movies = ref([]); // car une seule propriété
// comme on n'est pas en timeScript, je ne peux pas dire quelle sorte de données je veux dans mon tableau


//exporter aussi les fonctions qui vont manipuler les données
export function add({ id, title, description }) { // on lui passe ce dont il a besoin (identifié dans diagramme de classe)
    // on vérifie que les données sont bien présentes ( pasforcément ce qu'il y a de mieux à faire car c est du forcing)
    //if (!label || !url || !tags) return console.log('label and url and tags are required'); // si label ou url est manquant, on ne fait rien
    movies.value.push({ id, title, description });
    // console.log(movies.value);
}

export function removeByIndex(index) { // on lui passe l'index de l'élément à supprimer
    movies.value.splice(index, 1);// splice supprime un élément à partir d'un index
}

export function remove(movie) {
    const index = movies.value.indexOf(movie); // indexOf retourne l'index de l'élément dans le tableau
    removeByIndex(index); // on appelle la fonction removeByIndex
} // ici cela ne supprime pas les doublons

export function update(movie, newmovie) { // écrase l'actuel avec le futur
    const index = movies.value.indexOf(movie);
    movies.value.splice(index, 1, newmovie);
} // le update c est comme si on faisait un delete et un add

export function validate(movie) {
    const index = movies.value.indexOf(movie);
    movies.value[index].validated = true;
}
