export async function fetchDataPokemon(urlPokemon) {
    fetch(urlPokemon)
        .then(response => response.json())
        .then(data => {
            const pokemonData = data.results;

            const promises = pokemonData.map(pokemon => { // map permet de créer un nouveau tableau avec les données récupérées
                return fetch(pokemon.url)
                    .then(response => response.json());
            });

            // récupérer les données de type des Pokémon avant de pouvoir extraire d'autres informations, telles que les faiblesses, 
            //qui dépendent de ces données.
            Promise.all(promises)
                .then(pokemonDetails => {
                    const typePromises = pokemonDetails.map(pokemon => {
                        return fetch(pokemon.types[0].type.url)
                            .then(response => response.json());
                    });

                    Promise.all(typePromises)
                        .then(typeData => {
                            const updatedpokedex = pokemonDetails.map((pokemon, index) => {
                                const { name, id, types, sprites, moves, stats } = pokemon;
                                const typeNames = types.map(type => type.type.name).join(", "); // Utilisation de join() pour concaténer les noms des types
                                const imageUrl = sprites.front_default;
                                const attacks = moves.map(move => move.move.name);
                                // Obtenir les types de Pokémon qui sont forts contre le Pokémon actuel
                                const weaknesses = typeData[index].damage_relations.double_damage_from // cette ligne permet de récupérer les types de pokémon qui font le double de dégâts contre le pokemon actuel
                                    .map(type => type.name) // cette ligne permet de récupérer les noms des types avec map et de les mettre dans un tableau
                                    .filter(type => !types.some(t => t.type.name === type)); // cette ligne permet de filtrer les types qui sont déjà présents  =  faiblesses spécifiques du Pokémon
                                const hp = pokemon.stats[0].base_stat;
                                const atk = pokemon.stats[1].base_stat;
                                const def = pokemon.stats[2].base_stat;

                                return { name, id, types: typeNames, imageUrl, attacks, weaknesses, hp, atk, def };
                            });
                            console.log(updatedpokedex);

                            return updatedpokedex;
                            // pokedex.value = updatedpokedex;
                            // // console.log(pokedex.value);
                            // // envoyer les données dans le localSotrage seulement si le tableau est vide sinon envoyer un message
                            // if (localStorage.getItem('pokedex') === null) {
                            //     localStorage.setItem('pokedex', JSON.stringify(pokedex.value));
                            // } else {
                            //     console.log('Pokedex is already in localStorage');
                            //     pokedex.value = JSON.parse(localStorage.getItem('pokedex'));
                            // }
                        });
                })
                .catch(error => {
                    console.error('Une erreur s\'est produite lors de la récupération des données des Pokémon', error);
                });
        });
}