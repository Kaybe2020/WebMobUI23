// composable : utile à plusieurs composants
import { ref, watch } from "vue";


function saveInStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


// defaultValue = null car la première fois qu'on arrive dessus elle devrait être vide.
export function useLocalStorage(key, defaultValue = null) {
    let data = localStorage.getItem(key); // nom de l'espace mémoire dans localStorage. Comme il doit être transversal (utilisé plusieurs fois), ici on a besoin d'un paramètre (key)

    if (data === null) { // si on n'a pas de données, on retourne la valeur par défaut
        data = defaultValue;
        saveInStorage(key, data);
    } else {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.warn("Value in localStorage is not valid JSON, falling back to default value");
            data = defaultValue;
            saveInStorage(key, data);
        }
    }

    const value = ref(data); // transforme data en données réactives

    watch(value, () =>  // on veut que la valeur soit mise à jour dans le localStorage
    saveInStorage(key, value.value), // on sauvegarde la valeur dans le localStorage
    { deep: true }); // deep: true permet de regarder dans les sous-objets

    return { value }; // on retourne toujours un objet parce qu'on veut retourner plusieurs choses en types complexes

}

//dans localStorage on ne peut mettre que des strings, donc on doit transformer les données en JSON
