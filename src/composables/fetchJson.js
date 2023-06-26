import { ref, unref, watch, isRef } from "vue";

export function useFetchJson(url) {
    // le fetch est asynchrone. => la requête n'est pas bloquante. On va devoir écouter la réponse à un moment.
    // Si on fait plusieurs requêtes en même temps, on ne sait pas laquelle va répondre en premier.
    // On va donc utiliser une Promise pour écouter la réponse.(Une Promise est un objet qui va contenir la réponse à une requête asynchrone.)

    const data = ref(null); // tant qu'elle est nulle = promise non résolue + les useQQCH renvoient toujours un objet.

    async function fetchJson(url) {
        const response = await fetch(unref(url), { // envoie une requête au serveur et attend la réponse. SOuvent elle se trouve dans le body.
            // credentials: 'include'
        });

        const json = await response.json(); // on désérialise le json pour le transformer en objet JS.
        // A faire s'il y a des erreurs :
        data.value = json; // modifie la donnée réactive. (on ne peut pas modifier la constante)   
    }
    // cette façon est plus simple à écrire mais plus fourbe car asynchrone.
    fetchJson(url); // on appelle la fonction pour qu'elle s'exécute.
    if (isRef(url)) watch(url, () => fetchJson(url)); // si url est une référence, on écoute les changements de url et on appelle la fonction fetchJson.

    //vérifie si l'url est une ref
    watch(url), () => {
        fetchJson(unref(url));
    };

    return { data };
}