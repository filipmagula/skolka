<template>
  <div class="">
    <div class="title text-5xl p-4 text-white select-none">Písmena</div>
    <div class="w-full flex flex-row flex-wrap p-2">
      <Card v-for="(letter, index) in lettersToShow" :key="index" class="basis-1/2 p-2"
        @click="selectItem(letter.pronounciation, letter.word)"
        :primaryText="letter.visual"
        :secondaryText="letter.word"
        :picture="getImageUrl(removeDiacritics(letter.word))"
        :showPicture=false
        >
        
      </Card>
    </div>

    <div @click="selectLettersToShow()" class="bg-transblack border-1 rounded-lg p-2 m-4 text-xl text-white  cursor-pointer">
      Nová písmena
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
  const lettersToSelectFrom = letters.filter(letter => letter.words.length > 1)
  const selectedLetters = []
  while (selectedLetters.length < 6) {
    const randomIndex = Math.floor(Math.random() * lettersToSelectFrom.length)
    const randomLetter = lettersToSelectFrom[randomIndex]
    if (!selectedLetters.includes(randomLetter)) {
      selectedLetters.push(randomLetter)
    }
  }

  const selectedLettersAndWords = []
  selectedLetters.forEach(element => {
    const randomWordIndex = Math.floor(Math.random() * element.words.length)
    const randomWord = [element.words[randomWordIndex]][0]
    selectedLettersAndWords.push({ name: element.name, visual: element.visual, pronounciation: element.pronounciation, word: randomWord })
    console.log(randomWord)
  });


  lettersToShow.value = selectedLettersAndWords
  console.log(lettersToShow.value)
}

function removeDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const getImageUrl = (fileName) => {
  return new URL(`../assets/letters/${fileName}.jpg`, import.meta.url).href
}


function selectItem(name, word) {
  let speech = name + " jako " + word;
  
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
  { "name": "A", "pronounciation": "Aa", "visual":"A a", "words": ["auto", "autobus", "atmosféra", "anděl", "aplikace", "akvárium", "Amerika", "Austrálie", "Asie"] },
  { "name": "B", "pronounciation": "Bé", "visual":"B b", "words": ["boty", "bicykl", "balkón", "brouk", "bomba", "březen", "bubliny", "brusle", "bobr", "babička"] },
  { "name": "C", "pronounciation": "Cé", "visual":"C c", "words": ["cukr", "cena", "cirkus", "cuketa", "cibule", "cukrárna", "citrón"] },
  { "name": "Č", "pronounciation": "Čé", "visual":"Č č", "words": ["čáp", "čokoláda", "čepice", "čumák", "čára", "čaj", "čtyřka"] },
  { "name": "D", "pronounciation": "Dé", "visual":"D d", "words": ["dům", "dort", "diamant", "dárek", "doktor", "dálnice", "dýně", "dlaždice", "dinosaurus", "dvojka", "devítka", "desítka", "děda"] },
  { "name": "E", "pronounciation": "Ee", "visual":"E e", "words": ["elektrárna", "eskymák", "elektronika", "Evropa"] },
  { "name": "F", "pronounciation": "Ef", "visual":"F f", "words": ["fotbal", "fialka", "farma", "fotografie", "flek", "Ferda", "flétna"] },
  { "name": "G", "pronounciation": "Gé", "visual":"G g", "words": ["gól", "guma", "galerie", "gazela", "guláš", "gymnasta", "gumáky"] },
  { "name": "H", "pronounciation": "Há", "visual":"H h", "words": ["hodiny", "housle", "hřeben", "hokej", "houska", "hříbě", "hlava"] },
  { "name": "I", "pronounciation": "Měkké Ii", "visual":"I i", "words": ["internet", "inkoust", "iglú", "Itálie"] },
  { "name": "J", "pronounciation": "Jé", "visual":"J j", "words": ["jablko", "jaro", "jazyk", "jednička", "jedlík", "jednorožec", "jed", "jelen"] },
  { "name": "K", "pronounciation": "Ká", "visual":"K k", "words": ["kůň", "kolo", "kostel", "káva", "kamera", "kabát", "kabelka", "kaktus", "kalkulačka", "kamion", "kočka"] },
  { "name": "L", "pronounciation": "El", "visual":"L l", "words": ["láska", "léto", "lednice", "loď", "letadlo", "lampa", "lístek", "loutka", "lak", "lžíce"] },
  { "name": "M", "pronounciation": "Em", "visual":"M m", "words": ["město", "míč", "mobil", "mikrofon", "maminka", "měsíc", "mouka", "Mája", "meloun"] },
  { "name": "N", "pronounciation": "En", "visual":"N n", "words": ["nůž", "nádraží", "nábytek", "nápad", "nápoj", "náramek", "nůžky", "noha"] },
  { "name": "O", "pronounciation": "Óo", "visual":"O o", "words": ["okno", "obchod", "obraz", "obuv", "oběd", "obrazovka", "občerstvení", "opice", "okurka", "osmička"] },
  { "name": "P", "pronounciation": "Pé", "visual":"P p", "words": ["pes", "příroda", "přání", "příběh", "přístav", "pětka", "police", "pavouk"] },
  { "name": "Q", "pronounciation": "Qé", "visual":"Q q", "words": ["qéčko"] },
  { "name": "R", "pronounciation": "Er", "visual":"R r", "words": ["rádio", "rodina", "rýže", "rýma", "rýč", "růže", "ryba", "ráj", "raketa", "robot", "rak", "ruka"] },
  { "name": "S", "pronounciation": "Es", "visual":"S s", "words": ["slunce", "stůl", "stín", "skříň", "stavba", "sůl", "slepice", "soumrak", "střecha", "srdce", "sedmička", "sova"] },
  { "name": "Š", "pronounciation": "Eš", "visual":"Š š", "words": ["škola", "šaty", "šipka", "štěně", "šátek", "švec", "šperk", "štít", "šťastný", "šestka"] },
  { "name": "T", "pronounciation": "Té", "visual":"T t", "words": ["tráva", "traktor", "třešeň", "těsto", "tulipán", "trenér", "trpaslík", "třída", "trojka"] },
  { "name": "U", "pronounciation": "Uú", "visual":"U u", "words": ["ulice", "ucho", "usměv", "uzel", "učitel", "úsměv", "ucho", "užovka"] },
  { "name": "Ú", "pronounciation": "Dlouhé Uu", "visual":"Ú ů", "words": ["úhel", "údolí", "účes", "úspěch", "ústa"] },
  { "name": "V", "pronounciation": "Vé", "visual":"V v", "words": ["voda", "vítr", "vůně", "víno", "vůz", "včela", "výlet", "výhled", "vajíčko"] },
  { "name": "W", "pronounciation": "Dvojité Vé", "visual":"W w", "words": ["WC", "western"] },
  { "name": "X", "pronounciation": "Iks", "visual":"X x", "words": ["xylofón"] },
  { "name": "Y", "pronounciation": "Tvrdé Ýy", "visual":"Y y", "words": ["yzop", "ypsilón"] },
  { "name": "Z", "pronounciation": "Zet", "visual":"Z z", "words": ["zahrada", "zvíře", "zub", "zrcadlo", "zima", "zmrzlina", "zvonek", "zajíc", "zubr"] },
  { "name": "Ž", "pronounciation": "Žet", "visual":"Ž ž", "words": ["židle", "žena", "život", "žralok", "železo", "žirafa", "žonglér", "žihadlo", "žebřík"] },
]

</script>

<style scoped>

</style>
```