<template>
    <div class="color-app">
      <h2>Procvičování barev</h2>
      <button @click="speakGreetings">Pozdrav</button>
      <div class="">
        <div
          v-for="(color, index) in colors"
          :key="index"
          class=""
          :style="{ backgroundColor: color.hex }"
          @click="selectColor(color)"
        >
          {{ color.name }} 
          <br />    
        </div>
      </div>
      <div v-if="selectedColor">
        Vybraná barva: <strong>{{ selectedColor.name }}</strong>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        colors: [
          { name: 'Červená', hex: '#FF0000' },
          { name: 'Modrá', hex: '#0000FF' },
          { name: 'Zelená', hex: '#00FF00' },
          { name: 'Žlutá', hex: '#FFFF00' },
          { name: 'Bílá', hex: '#FFFFFF' },
          { name: 'Černá', hex: '#000000' },
          { name: 'Hnědá', hex: '#654321' },
          { name: 'Oranžová', hex: '#FFA500' },
          { name: 'Růžová', hex: '#FFC0CB' },
          { name: 'Fialová', hex: '#800080' },
          { name: 'Šedá', hex: '#808080' },
          
          // Přidejte další barvy podle potřeby
        ],
        greeting: 'Ahoj Ferdo, pojďme se učit barvy!',
        selectedColor: null,
        voice: null,
      };
    },
    created() {
        this.setVoice();
        this.speakGreetings();
      },
  
    methods: {
  
      selectColor(color) {
        this.selectedColor = color;
        this.speakColor(color.name); // Přidáme tuto řádku
      },
  
      setVoice() {
        if ('speechSynthesis' in window) {
          let synth = window.speechSynthesis;
          const voices = synth.getVoices();
          this.voice = voices.find(_voice => /cs[-_]CZ/.test(_voice.lang));
          console.log(this.voice);
        } else {
          console.error('Web Speech API není podporováno v tomto prohlížeči.');
        }
      },
  
      speakGreetings() {
        if ('speechSynthesis' in window) {
          const msg = new SpeechSynthesisUtterance(this.greeting);
          msg.lang = 'cs_CZ';
          msg.voice = this.voice;
          window.speechSynthesis.speak(msg);
        } else {
          console.error('Web Speech API není podporováno v tomto prohlížeči.');
        }
      },
  
      speakColor(colorName) {
        if ('speechSynthesis' in window) {
          const msg = new SpeechSynthesisUtterance(colorName);
          msg.lang = 'cs_CZ';
          msg.voice = this.voice;
          window.speechSynthesis.speak(msg);
        } else {
          console.error('Web Speech API není podporováno v tomto prohlížeči.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .color-app {
    font-family: Arial, sans-serif;
    text-align: center;
  }
  

  .color-box:hover {
    animation: rotate 1s
  }
  
  @keyframes rotate {
    from {
      -webkit-transform: rotate(0deg) scale(1) skew(0deg) translate(0px);
    }
    to {
      -webkit-transform: rotate(180deg) scale(4) skew(0deg) translate(0px);
    }
    to {
      -webkit-transform: rotate(360deg) scale(1) skew(0deg) translate(0px);
    }
  }
  
  @keyframes mymove {
    0%   {top: 0px;}
    25%  {top: 200px;}
    50%  {top: 100px;}
    75%  {top: 200px;}
    100% {top: 0px;}
  }
  </style>