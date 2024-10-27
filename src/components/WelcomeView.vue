<template>
  <div class="w-full">
    <div class="title text-5xl p-4 text-white">Zábavná školka</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="game in games" class="basis-1/2 p-2 cursor-pointer" @click="$emit('showView', game.view)">
        <div class="flex flex-col h-36 border border-black rounded-lg justify-center bg-transblack">
          <div class="flex text-4xl h-full items-center justify-center text-white">
            <img :src="getFileUrl('../assets/', game.icon)" :alt="game.name" class="h-14">
          </div>
          <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg"> {{ game.name }} </div>
        </div>
      </div>
    </div>

    <div @click="$emit('showView', 'player')"
      class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1">
      <img src="../assets/player.png" alt="Nastavení" class="p-1 h-8 mr-2">
      <p>Nastavení hráče</p>
    </div>
 
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import tts from '../tts';
import { greetings, games } from "../assets/data.json"
import { getFileUrl } from '../composables/getFileUrl';

onMounted(() => {
  speak(greetings.welcome1 + " " + greetings.welcome2);
});

const speak = (text) => {
  if ('speechSynthesis' in window) {
    tts.speak(text);
  } else {
    console.error('Web Speech API není podporováno v tomto prohlížeči.');
  }
};
</script>