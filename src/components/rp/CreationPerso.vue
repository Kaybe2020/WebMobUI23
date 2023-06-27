<script setup>
import BaseButton from './BaseButton.vue';
import races from '../../stores/jeuRoles/races.json';
import { computed, ref } from 'vue';
import { jeuRoles, page, indexPersoSelect } from '../../stores/jeuRoles/localStorageJR.js';

const lvl = ref(1);

const raceSelect = ref(races[0]); // pour récuprer la race pour les lvlMAx

function lvlMaxRace(event) {
    raceSelect.value = races.find((race) => race.Nom === event.target.value);
    // const levelMaxRace = raceSelect.value;
    // if (lvl.value > levelMaxRace.NiveauMax) {
    //     lvl.value = levelMaxRace.NiveauMax;
    // };
    lvl.value = 1;
}
function lvlDown() {
    if (lvl.value > 1) {
        lvl.value--;
    };
}
function lvlUp() {
    const levelMaxRace = races.find((race) => race.Nom === raceSelect.value.Nom);
    if (lvl.value < levelMaxRace.NiveauMax) {
        lvl.value++;
    };
}

const calculAtk = computed(() => {
    return Math.round(((raceSelect.value.Stats.Force * 0.6) + (raceSelect.value.Stats.Const * 0.4)) * (1 + ((lvl.value - 1) * 0.6))); //calcul de l'attaque, merci Nico pour la formule
});
const calculDef = computed(() => {
    return Math.round(((raceSelect.value.Stats.Dex * 0.6) + (raceSelect.value.Stats.Int * 0.4)) * (1 + ((lvl.value - 1) * 0.4)));
});
const calculMag = computed(() => {
    return Math.round(((raceSelect.value.Stats.Int * 0.6) + (raceSelect.value.Stats.Sag * 0.5)) * (1 + ((lvl.value - 1) * 0.4)));
});

const listAttacks = computed(() => {
    return raceSelect.value.ListeAttaques.filter((attack) => attack.Niveau <= lvl.value);
})

function imagePreview(event) {
    const imgInp = event.target; //charge l image
    const apercu = document.getElementById('apercu'); // affiche l image


    const [file] = imgInp.files
    if (file) {
        apercu.src = URL.createObjectURL(file)
    }
}

// enregistrement localStorage sans v-model car trop de réactivité sinon => change les données enregistrées dans le local storage
function enregistrerPerso(event) {
    const champs = event.target.elements;
    jeuRoles.value.push({ nom: champs.nom.value, race: raceSelect.value.Nom, guilde: champs.guilde.value, histoire: champs.histoire.value, image: champs.imagePerso.value })
    alert("la fiche personnage de " + event.target.elements.nom.value + " a été créée.");
    // CHANGER LE # DE LA PAGE POUR REVENIR SUR HOME
    page.value = 'home';
}

function supprimerPerso() {
    if (confirm("Voulez-vous vraiment supprimer ce personnage ?")) {
        jeuRoles.value.splice(indexPersoSelect.value, 1);
        page.value = 'home';
    }
}
const nom = computed(() => {
    if (page.value == 'personnage' && indexPersoSelect.value > -1) {
        return jeuRoles.value[indexPersoSelect.value].nom;
    } else {
        return '';
    }
});

</script>


<template>
    <form @submit.prevent="enregistrerPerso">
        <label>Nom <input type="text" name="nom" v-model="nom" /></label>

        <label>Guilde <input type="text" name="guilde" /></label>

        <label>Race <select @change="lvlMaxRace">
                <option v-for="race in races">{{ race.Nom }}</option>
            </select>
        </label>

        <div>
            <p>Niveau <span>{{ lvl }}</span> <button @click="lvlDown">-</button><button @click="lvlUp">+</button></p>
            <!-- suivant race : si plus petit on augmente sinon rien -->
        </div>

        <div>
            <p>Atk <span>{{ calculAtk }} + 1d12</span></p>
            <p>Def <span>{{ calculDef }} + 1d6</span></p>
            <p>Mag <span>{{ calculMag }} + 1d4</span></p>
        </div>

        <div>
            <p><strong>Liste des attaques</strong></p>
            <p v-for="attack in listAttacks">{{ attack.Nom }} {{ attack.Degats }}</p>
        </div>

        <label>Histoire personnage <textarea name="histoire">{{ raceSelect.Histoire }}</textarea></label>

        <!-- affiche l'image -->
        <label>Image <input accept="image/*" type='file' id="imgInp" @change="imagePreview" name="imagePerso" /></label>
        <img id="apercu" src="#" alt="your image" />



        <BaseButton type="submit">Enregistrer</BaseButton>
        <BaseButton @click="supprimerPerso" v-if="page == 'personnage' && indexPersoSelect > -1">Supprimer</BaseButton>

    </form>
</template>

<style scoped>
button {
    padding: 0.5rem 1rem;
}

/********************************************************************************************************
MARCHE A SUIVRE
*********************************************************************************************************/
/* En mode #
1) Importer + faire header
2) Créer les feuilles des composants que l'ont veut
3) Importer dans APP
4) Dans BAseButton mettre <slot> pour changer le texte
5) CréationPerso => créer la page
6) Faire fichier JSON
7) Entrer les informations dans le template

!!! .value quand on est hors de la template !!! */
</style>