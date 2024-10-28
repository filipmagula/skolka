<template>
  <div class="w-full">
    <div class="title text-5xl p-4 text-white">Nastavení</div>
    <div class="flex flex-col flex-wrap p-2 text-white items-start">
      <div class="flex flex-row m-4">
        <div class="text-xl mr-4 p-2 w-1/3 text-right">Oslovení</div>
        <input type="text" class="text-3xl bg-transblack px-4 w-2/3" id="playerName" v-model="playerName" />
      </div>
      <div class="flex flex-row m-4">
        <div class="text-xl mr-4 p-2 w-1/3 text-right">Počty do</div>
        <input type="text" class="text-3xl bg-transblack px-4 w-2/3" id="countingMax" v-model="countingMax" />
      </div>
    </div>
    <div @click="$emit('showView', 'welcome')" class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1">
      <img src="/general/back.png" alt="" class="p-1 h-8 mr-2" />
      <p>Zpět</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const playerName = ref("")
</script>
