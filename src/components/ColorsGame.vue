<template>
  <div>
    <div></div>
    <div class="title text-5xl p-4 text-white">Barvy</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="(color, index) in colors" :key="index" :class="{ 'animate-spin': spinningIndex === index }"
        class="basis-1/3 p-2" @click="selectColor(color); spin(index);">
        <div class="flex h-28 border border-black rounded-lg justify-center items-end content-end"
          :style="{ backgroundColor: color.hex }">
          <div class="bg-slate-700 opacity-75 text-white px-2 rounded-t-lg">{{ color.name }}</div>
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
import { ref, onMounted } from 'vue';
import tts from '../tts';

const colors = ref([
  { name: 'Červená', hex: '#ff5661' },
  { name: 'Modrá', hex: '#83b3fb' },
  { name: 'Zelená', hex: '#8bf18b' },
  { name: 'Žlutá', hex: '#ffea81' },
  { name: 'Bílá', hex: '#FFFFFF' },
  { name: 'Černá', hex: '#000000' },
  { name: 'Hnědá', hex: '#a73312' },
  { name: 'Oranžová', hex: '#fc874d' },
  { name: 'Růžová', hex: '#fb83be' },
  { name: 'Fialová', hex: '#c35df3' },
  { name: 'Šedá', hex: '#808080' },
  // Přidejte další barvy podle potřeby
]);

const greeting = ref('Pojďme na barvy!');
const selectedColor = ref(null);
const voice = ref(null);
const spinningIndex = ref(null);

const spin = (index) => {
  spinningIndex.value = index;
  setTimeout(() => {
    spinningIndex.value = null;
  }, 1000);
}

const speak = (text) => {
  if ('speechSynthesis' in window) {
    tts.speak(text);
  } else {
    console.error('Web Speech API není podporováno v tomto prohlížeči.');
  }
};

const selectColor = (color) => {
  selectedColor.value = color;
  speak(color.name);
};

onMounted(() => {
  speak(greeting.value);
});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear;
}
</style>
