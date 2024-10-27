<template>
  <div class="">
    <div class="title text-5xl p-4 text-white">Počítání</div>
    <div class="text-7xl text-white my-8">{{ question }}</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div v-for="(option, index) in options" :key="index" class="basis-1/2 p-2" @click="checkAnswer(option)"
        :disabled="answered">
        <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack"
        :class="getClass(option)">
          <div class="flex text-4xl h-full items-center justify-center text-white"> {{ option }} </div>
        </div>
      </div>
      <div v-if="answered" @click="nextQuestion" class="bg-transblack border-1 rounded-lg p-2 m-2 text-xl text-white w-full">Další</div>
      
    </div>
    <div @click="$emit('showView', 'welcome')"
      class="flex flex-row bg-transblack border-1 rounded-lg p-2 text-xl text-white m-4 absolute bottom-1">
      <img src="../assets/back.png" alt="Zpět" class="p-1 h-8 mr-2">
      <p>Zpět</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import tts from '../tts'

// Generuje náhodné číslo v daném rozsahu
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Vytváří náhodný příklad na sčítání do 20
const generateQuestion = () => {
  const answer = random(2, 10);
  const a = random(1, answer - 1);
  const b = answer - a;
  const question = `${a} + ${b} = ?`;
  
  return { question, answer };
};

// Vytváří čtyři možnosti, z nichž jedna je správná
const generateOptions = (answer) => {
  const options = [answer];
  while (options.length < 4) {
    const option = random(1, 10);
    if (!options.includes(option)) {
      options.push(option);
    }
  }
  // Zamíchá možnosti
  options.sort(() => Math.random() - 0.5);
  return options;
};

// Vytváří nový příklad a možnosti
const newQuestion = () => {
  const { question, answer } = generateQuestion();
  const options = generateOptions(answer);
  return { question, answer, options };
};

// Uchovává stav aplikace
const state = ref(newQuestion());
const question = computed(() => state.value.question);
const answer = computed(() => state.value.answer);
const options = computed(() => state.value.options);

// Uchovává, zda uživatel odpověděl
const answered = ref(false);

// Kontroluje, zda uživatel zvolil správnou odpověď
const checkAnswer = (option) => {
  answered.value = true;
  speak(question.value.slice(0, -1)  + " " + answer.value);
  /*
  if (option === answer.value) {
    alert("Správně!");
  } else {
    alert("Špatně!");
  }
  */
};

// Zobrazuje další příklad
const nextQuestion = () => {
  state.value = newQuestion();
  answered.value = false;
  speak("Kolik je " + question.value.slice(0, -3) + "?");
};

// Vrací třídu pro tlačítko podle odpovědi
const getClass = (option) => {
  if (!answered.value) {
    return "normal";
  } else if (option === answer.value) {
    return "correct";
  } else {
    return "wrong";
  }
};

function speak(speech) {
  tts.speak(speech)
}

onMounted(() => {
  speak("Kolik je " + question.value.slice(0, -3) + "?");
})
</script>
  
<style>
.correct {
  background-color: rgba(0, 255, 0, 0.75);
}

.wrong {
  background-color: rgba(255, 0, 0, 0.75);
}
</style>