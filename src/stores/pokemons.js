import { ref } from 'vue';
import { useLocalStorage } from "../composables/localStorage.js";

// export const { value: pokemons } = useLocalStorage('pokedex', []);
// export const { value: myPokemons } = useLocalStorage('myPokemons', []);
// export const { value: chen } = useLocalStorage('chen', []);

// si il y a un ajout de pokemons c'est forcément dans mes pokemons
export function add({ name, url }) {
    myPokemons.value.push({ name, url });
    console.log(myPokemons.value);
}

export function removeChen(pokemon, chen) {
    const index = myPokemons.value.indexOf(pokemon);
    // copie ce pokemon dans le tableau chen
    chen.value.push(myPokemons.value[index]);
    //supprime ce pokemon du tableau pokemons
    myPokemons.value.splice(index, 1);
}

export function removeByIndex(index) {
    myPokemons.value.splice(index, 1);
}

export function remove(pokemon) {
    const index = pokemons.value.indexOf(pokemon);
    removeByIndex(index);
}

export function show(pokemon) {
    const index = myPokemons.value.indexOf(pokemon) || pokemons.value.indexOf(pokemon);
    pokemon.value[index].show = true;
}


