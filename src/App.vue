<script setup>
import ColorsGame from './components/ColorsGame.vue';
import NumbersGame from './components/NumbersGame.vue';
import ShapesGame from './components/ShapesGame.vue';
import WelcomeView from './components/WelcomeView.vue';
import LettersGame from './components/LettersGame.vue';
import CountingGame from './components/CountingGame.vue';
import PlayerView from './components/PlayerView.vue';

import { ref } from 'vue'

const selectedScreen = ref('welcome')

function showNumbers() {
  console.log('showNumbers')
  selectedScreen.value = 'numbers'
}

function showColors() {
  selectedScreen.value = 'colors'
}

function showView(name) {
  selectedScreen.value = name
}

</script>

<template>
  <div class="main w-full">
    <WelcomeView v-if="selectedScreen=='welcome'" class="" @showView="showView" />
    <NumbersGame v-if="selectedScreen=='numbers'" class="" @showView="showView" />
    <ColorsGame v-if="selectedScreen=='colors'" class="" @showView="showView" />
    <ShapesGame v-if="selectedScreen=='shapes'" class="" @showView="showView" />
    <LettersGame v-if="selectedScreen=='letters'" class="" @showView="showView" />
    <CountingGame v-if="selectedScreen=='counting'" class="" @showView="showView" />
    <PlayerView v-if="selectedScreen=='player'" class="" @showView="showView" />
  </div>
  
</template>

<style scoped>
.main{
  max-width: 450px;
  height: 100%;
  background-image: url('./assets/background.png');
  background-size: cover;
}
</style>
