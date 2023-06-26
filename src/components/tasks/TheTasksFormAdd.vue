<script setup>
import  { page, tasks }  from '../../stores/tasks.js'
</script>

<template>
    <div>
        <input type="texte" />
        <button>add</button>
        <button @click="page = 'home'">cancel</button>
    </div>
</template>

<style scoped>
div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(224, 224, 224);
    color: #000;
    padding: auto;
}
</style>
```