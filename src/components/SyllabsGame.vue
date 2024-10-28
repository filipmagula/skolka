<template>
  <div class="">
    <div class="title text-5xl p-4 text-white select-none">Písmena</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="(letter, index) in syllablesToShow" :key="index" class="basis-1/3 p-2" @click="selectItem(letter.pronounciation)">
        <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
          <div class="flex text-4xl h-full items-center justify-center text-white">{{ letter.name }}</div>
        </div>
      </div>
    </div>

    <div @click="selectSyllablesToShow()" class="bg-transblack border-1 rounded-lg p-2 m-4 text-xl text-white cursor-pointer">Nové slabiky</div>

    <div @click="$emit('showView', 'welcome')" class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1 cursor-pointer">
      <img src="../assets/general/back.png" alt="" class="p-1 h-8 mr-2" />
      <p>Zpět</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { greetings, syllables } from "../assets/data.json"
import tts from "../tts"

const syllablesToShow = ref(null)

let voice = null

function selectSyllablesToShow() {
  // clear the syllablesToShow array
  syllablesToShow.value = []

  // select 9 random but unique syllables from the syllables array
  const syllablesToSelectFrom = syllables.filter((letter) => letter.name.length > 1)
  const selectedsyllables = []
  while (selectedsyllables.length < 9) {
    const randomIndex = Math.floor(Math.random() * syllablesToSelectFrom.length)
    const randomLetter = syllablesToSelectFrom[randomIndex]
    if (!selectedsyllables.includes(randomLetter)) {
      selectedsyllables.push(randomLetter)
    }
  }

  syllablesToShow.value = selectedsyllables
  console.log(syllablesToShow.value)
}

function selectItem(name) {
  let speech = name
  tts.speak(speech)
}

onMounted(() => {
  tts.speak(greetings.syllables)
  selectSyllablesToShow()
})
</script>
