<template>
  <div class="">
    <div class="title text-5xl p-4 text-white">Tvary</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="(shape, index) in shapes" :key="index" class="basis-1/3 p-2" @click="speakShape(shape.name)">
        <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
          <div class="flex h-full items-center justify-center">
            <img class="max-h-14 max-w-14 p-1" :src="getImageUrl(shape.file)" :alt="shape.name">
          </div>
          <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg">{{ shape.name }}</div>
        </div>
      </div>
    </div>
    <div @click="$emit('showView', 'welcome')"
      class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1">
      <img src="../assets/back.png" alt="Zpět" class="p-1 h-8 mr-2">
      <p>Zpět</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const getImageUrl = (fileName) => {
  return new URL(`../assets/${fileName}`, import.meta.url).href
}

let voice = null

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

function speakShape(shape) {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(shape);
    msg.lang = 'cs_CZ';
    msg.voice = voice;
    window.speechSynthesis.speak(msg);
  } else {
    console.error('Web Speech API není podporováno v tomto prohlížeči.');
  }
}

onMounted(() => {
  setVoice();
})

const shapes = [
  { "name": "čtverec", "file": "square.png" },
  { "name": "kruh", "file": "circle.png" },
  { "name": "obdelník", "file": "rectangle.png" },
  { "name": "trojúhelník", "file": "triangle.png" },
  { "name": "ovál", "file": "oval.png" },
  { "name": "lichoběžník", "file": "trapezoid.png" },
  { "name": "rovnoběžník", "file": "parallelogram.png" },
  { "name": "hvězda", "file": "star.png" },
  { "name": "spirála", "file": "spiral.png" },
]
</script>