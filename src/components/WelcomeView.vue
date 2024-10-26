<template>
  <div class="w-full">
    <div class="title text-5xl p-4 text-white">Zábavná školka</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="game in games" class="basis-1/2 p-2 cursor-pointer" @click="$emit('showView', game.view)">
        <div class="flex flex-col h-36 border border-black rounded-lg justify-center bg-transblack">
          <div class="flex text-4xl h-full items-center justify-center text-white">
            <img :src="getImageUrl(game.icon)" :alt="game.name" class="h-14">
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

<script setup>
import { ref, onMounted } from 'vue';
const greeting = ref('Ahoj, pojďme si hrát!');
let voice = null;

onMounted(() => {
  setVoice();
  speak(greeting.value);
});

function setVoice() {
  if ('speechSynthesis' in window) {
    let synth = window.speechSynthesis;
    const voices = synth.getVoices();
    voice = voices.find(_voice => /cs[-_]CZ/.test(_voice.lang));
    console.log(voice);
  } else {
    console.error('Web Speech API není podporováno v tomto prohlížeči.');
  }
}

function speak(speech) {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(speech);
    msg.lang = 'cs_CZ';
    msg.voice = voice;
    window.speechSynthesis.speak(msg);
  } else {
    console.error('Web Speech API není podporováno v tomto prohlížeči.');
  }
}

const getImageUrl = (fileName) => {
  return new URL(fileName, import.meta.url).href
}

const games =
  [
    { "view": "colors", "name": "Barvy", "icon": "../assets/iconColors.png" },
    { "view": "numbers", "name": "Čísla", "icon": "../assets/iconNumbers.png" },
    { "view": "letters", "name": "Písmena", "icon": "../assets/iconLetters.png" },
    { "view": "shapes", "name": "Tvary", "icon": "../assets/iconShapes.png" },
    { "view": "counting", "name": "Počítání", "icon": "../assets/iconCounting.png" },
    { "view": "syllables", "name": "Slabiky", "icon": "../assets/iconLetters.png" }
  ]

</script>
  
<style scoped></style>