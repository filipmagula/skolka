<script setup>
import Colors from './components/Colors.vue'
</script>

<template>
  <div class="main">
    <h1>Veselá školka</h1>
    <Colors msg="Vite + Vue" />
  </div>
  
</template>

<style scoped>
.main{
  height: 100%;
  width: 100%;
  background-image: url('./assets/background.png');
  background-size: cover;
}

.main h1 {
  font-family: 'Comic Sans MS', cursive, sans-serif;
  font-size: 3em;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 0 1em #646cff;
  margin: 0;
  padding: 0.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
