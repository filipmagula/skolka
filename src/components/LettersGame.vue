<template>
  <div class="">
    <div class="title text-5xl p-4 text-white select-none">Písmena</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <Card
        v-for="(letter, index) in lettersToShow"
        :key="index"
        class="basis-1/2 p-2"
        @click="selectItem(letter.pronunciation, letter.word)"
        :primaryText="letter.visual"
        :secondaryText="letter.word"
        :picture="getFileUrl('/letters/', removeDiacritics(letter.word) + '.jpg')"
        :showPicture="false"
      >
      </Card>
    </div>

    <div @click="selectLettersToShow()" class="bg-transblack border-1 rounded-lg p-2 m-4 text-xl text-white cursor-pointer">Nová písmena</div>

    <div @click="$emit('showView', 'welcome')" class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1 cursor-pointer">
      <img src="/general/back.png" alt="" class="p-1 h-8 mr-2" />
      <p>Zpět</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import Card from "./Card.vue"
import { greetings, letters } from "../assets/data.json"
import tts from "../tts"
import { removeDiacritics } from "../composables/removeDiacritics"
import { getFileUrl } from "../composables/getFileUrl"

const lettersToShow = ref(null)

function selectLettersToShow() {
  // clear the lettersToShow array
  lettersToShow.value = []

  // select 9 random but unique letters from the letters array
  const lettersToSelectFrom = letters.filter((letter) => letter.words.length > 1)
  const selectedLetters = []
  while (selectedLetters.length < 6) {
    const randomIndex = Math.floor(Math.random() * lettersToSelectFrom.length)
    const randomLetter = lettersToSelectFrom[randomIndex]
    if (!selectedLetters.includes(randomLetter)) {
      selectedLetters.push(randomLetter)
    }
  }

  const selectedLettersAndWords = []
  selectedLetters.forEach((element) => {
    const randomWordIndex = Math.floor(Math.random() * element.words.length)
    const randomWord = [element.words[randomWordIndex]][0]
    selectedLettersAndWords.push({ name: element.name, visual: element.visual, pronunciation: element.pronunciation, word: randomWord })
  })

  lettersToShow.value = selectedLettersAndWords
}

function selectItem(name, word) {
  let speech = name + " jako " + word
  tts.speak(speech)
}

onMounted(() => {
  tts.speak(greetings.letters)
  selectLettersToShow()
})
</script>
