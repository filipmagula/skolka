<template>
  <div class="">
    <div class="title text-5xl p-4 text-white select-none">Písmena</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="(letter, index) in lettersToShow" :key="index" class="basis-1/3 p-2" @click="selectItem(letter.pronounciation)">
        <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
          <div class="flex text-4xl h-full items-center justify-center text-white"> {{ letter.name }}</div>
        </div>
      </div>
    </div>

    <div @click="selectLettersToShow()" class="bg-transblack border-1 rounded-lg p-2 m-4 text-xl text-white  cursor-pointer">
      Nové slabiky
    </div>

    <div @click="$emit('showView', 'welcome')"
      class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1 cursor-pointer">
      <img src="../assets/back.png" alt="Zpět" class="p-1 h-8 mr-2">
      <p>Zpět</p>
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import Card from './Card.vue';

const lettersToShow = ref(null)

let voice = null

function selectLettersToShow() {
  // clear the lettersToShow array
  lettersToShow.value = []

  // select 9 random but unique letters from the letters array
  const lettersToSelectFrom = letters.filter(letter => letter.name.length > 1)
  const selectedLetters = []
  while (selectedLetters.length < 9) {
    const randomIndex = Math.floor(Math.random() * lettersToSelectFrom.length)
    const randomLetter = lettersToSelectFrom[randomIndex]
    if (!selectedLetters.includes(randomLetter)) {
      selectedLetters.push(randomLetter)
    }
  }

  lettersToShow.value = selectedLetters
  console.log(lettersToShow.value)
}

function removeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const getImageUrl = (fileName) => {
  return new URL(`../assets/letters/${fileName}.jpg`, import.meta.url).href
}


function selectItem(name) {
  let speech = name
  
  speakLetter(speech)
}

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

function speakLetter(letterSpeech) {
  if ('speechSynthesis' in window) {
    const msg = new SpeechSynthesisUtterance(letterSpeech);
    msg.lang = 'cs_CZ';
    msg.voice = voice;
    window.speechSynthesis.speak(msg);
  } else {
    console.error('Web Speech API není podporováno v tomto prohlížeči.');
  }
}

onMounted(() => {
  setVoice();
  selectLettersToShow()
})

const letters = [
  { "name": "MA", "pronounciation": "Ma" },
  { "name": "MI", "pronounciation": "Mi" },
  { "name": "TA", "pronounciation": "Ta" },
  { "name": "LA", "pronounciation": "La" },
  { "name": "LO", "pronounciation": "Lo" },
  { "name": "ME", "pronounciation": "Me" },
  { "name": "LE", "pronounciation": "Le" },
  { "name": "JA", "pronounciation": "Ja" },
  { "name": "JE", "pronounciation": "Je" },
  { "name": "KE", "pronounciation": "Ke" },
  { "name": "KO", "pronounciation": "Ko" },
  { "name": "SI", "pronounciation": "Si" },
  { "name": "SE", "pronounciation": "Se" },
  { "name": "LE", "pronounciation": "Le" },
  { "name": "FE", "pronounciation": "Fe" },
]

</script>

<style scoped>

</style>
```