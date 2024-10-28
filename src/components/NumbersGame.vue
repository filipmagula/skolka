<template>
  <div class="">
    <div class="title text-5xl p-4 text-white">Čísla</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="(color, index) in numbers" :key="index" class="basis-1/3 p-2" @click="selectItem(color)">
        <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
          <div class="flex text-4xl h-full items-center justify-center text-white">{{ color.number }}</div>
          <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg">{{ color.name }}</div>
        </div>
      </div>
    </div>
    <div @click="$emit('showView', 'welcome')" class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1">
      <img src="/general/back.png" alt="" class="p-1 h-8 mr-2" />
      <p>Zpět</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import tts from "../tts"
import { greetings, numbers } from "../assets/data.json"

const selectItem = (color) => {
  tts.speak(color.name)
}

onMounted(() => {
  tts.speak(greetings.numbers)
})
</script>
