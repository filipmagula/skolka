<template>
  <div class="">
    <div class="title text-5xl p-4 text-white">Tvary</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="(shape, index) in shapes" :key="index" class="basis-1/3 p-2" @click="speakShape(shape.name)">
        <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
          <div class="flex h-full items-center justify-center">
            <img class="max-h-14 max-w-14 p-1" :src="getFileUrl('/shapes/', shape.file)" :alt="shape.name" />
          </div>
          <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg">{{ shape.name }}</div>
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
import { onMounted } from "vue"
import { greetings, shapes } from "../assets/data.json"
import tts from "../tts"
import { getFileUrl } from "../composables/getFileUrl"

function speakShape(shape) {
  tts.speak(shape)
}

onMounted(() => {
  tts.speak(greetings.shapes)
})
</script>
