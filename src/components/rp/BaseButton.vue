<script setup></script>


<template>
    <button>
        <slot />
    </button>
</template>

<style scoped>
button {
    padding: 0 1rem;
    height: 2rem;
    background-color: brown;
    color: white;
    border: none;
    border-radius: 0.5rem;
    transition: .2s;
}

button:hover {
    background-color: rgb(111, 29, 29);
    color: orange;

}
</style>