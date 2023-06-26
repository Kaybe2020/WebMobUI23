<script setup>
import { computed, defineProps  } from 'vue';
import { round } from '../../utils/math.js';


/******************Définir les différentes propriétés de l'input ****************************************************/
//ne pas oublier d'importer defineProps de vue

// 5) Définir les différentes propriétés de l'input
const props = defineProps({
    label: {
        type: String,
        required: false,
        default: '' // le mettre vide le rend optionnel
    },
    unit: {
        type: String,
        required: false,
        default: ''
    },
    modelValue: {
        type: Number,
        required: true,
    },

    decimalPlaces: {
        type: Number,
        required: false,
        default: 2
    }
})


/******************Définir les différentes méthodes ****************************************************/
//9) emits permet de définir les événements émis par le composant
const emits = defineEmits(['update:modelValue']);

const value = computed({
    get() {
        //faire ici l'arrondi à 2 chiffres après la virgule avec la fonction round (, 2)
        return round(props.modelValue, props.decimalPlaces);
        // le 2(props.decimalPlaces) est une constante littérale qui ne change pas, donc on évite ce n'est pas souple alors on rajoute une props pour pouvoir la changer (decimalPlaces)
    },
    set(value) {
        emits('update:modelValue', Number(value)); //Number(value) permet de convertir la valeur en nombre et pas la laisser en string
    }
});
</script>


<!-- ******** Template ******************************************** -->
<template>
    <!--2) Encapsuler l'input dans une div-->
    <!--6) Donner les directives grâce à v-if pour gagner en visibilité-->
    <div>
        <label v-if="unit">{{ unit }}</label>
        <!-- F) faire un v-if pour retourner qqch si la condition est vraie
            v-if permet d'afficher le label uniquement si l'unité est définie
                                            {{ unit }} signifie que la valeur de l'attribut unit sera affichée. Les {{  }} permettent d'afficher une valeur -->
        <input type="number" :placeholder="label" v-model="value" />
        <!--placeholder permet d'afficher un texte dans l'input et le label permet d'afficher un texte à côté de l'input
                 v-model="value" signifie que la valeur de l'input sera la valeur de la computed value 
                les racourcis d'écriture gère tout pour nous mais cela peut poser porblème par exemple pour l'arrondi-->
    </div>

   
</template>

<style scoped>

/* 3) Faire un minimum de CSS */
div {
    margin: 1rem;
}

label {
    margin-bottom: 0.5rem;
    margin-right: 0.5rem;
}

input {
    padding: 0.5rem;
}
</style>

