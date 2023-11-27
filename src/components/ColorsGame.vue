<template>
  <div class="">
    <div ></div>
    <div class="title text-5xl p-4 text-white">Barvy</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <div
        v-for="(color, index) in colors"
        :key="index"
        class="basis-1/3 p-2"
        @click="selectColor(color)"
      >
        <div class="flex h-28 border border-black rounded-lg justify-center items-end content-end"
         :style="{ backgroundColor: color.hex}"
        >
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

<script>
export default {
  data() {
    return {
      colors: [
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
      ],
      greeting: 'Pojdmě na barvy!',
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