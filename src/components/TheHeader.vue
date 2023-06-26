<script setup>
// import { onMounted, onUnmounted } from 'vue'

// function update(event) {
//   console.log('update', event.pageX, event.pageY)
// }

// onMounted(() => window.addEventListener('mousemove', update))
// onUnmounted(() => window.removeEventListener('mousemove', update))

// window.addEventListener('keyup', () => {
//     console.log(evt.key); // si on est dans un composant unique faire juste cela ne pose pas de soucis
// });

</script>

<template>
  <header>
    <slot></slot> <!-- pour changer le titre de la page de manière dynamique -->
  </header>
</template>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}
</style>