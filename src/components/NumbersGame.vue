<template>
    <div class="">
        <div class="title text-5xl p-4 text-white">Čísla</div>
        <div class="w-full flex flex-row flex-wrap p-2">
            <div v-for="(color, index) in numbers" :key="index" class="basis-1/3 p-2" @click="selectItem(color)">
                <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
                    <div class="flex text-4xl h-full items-center justify-center text-white"> {{ color.number }}</div>
                    <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg">{{ color.name }}</div>
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
            numbers: [
                { name: 'Jedna', number: '1' },
                { name: 'Dvě', number: '2' },
                { name: 'Tři', number: '3' },
                { name: 'Čtyři', number: '4' },
                { name: 'Pět', number: '5' },
                { name: 'Šest', number: '6' },
                { name: 'Sedm', number: '7' },
                { name: 'Osm', number: '8' },
                { name: 'Devět', number: '9' },
                { name: 'Deset', number: '10' },
                { name: 'Dvacet', number: '20' },
                { name: 'Sto', number: '100' },
            ],
            greeting: 'Pojďme na čísla!',

            voice: null,
        };
    },
    created() {
        this.setVoice();
        this.speakGreetings();
    },

    methods: {

        selectItem(color) {
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
    0% {
        top: 0px;
    }

    25% {
        top: 200px;
    }

    50% {
        top: 100px;
    }

    75% {
        top: 200px;
    }

    100% {
        top: 0px;
    }
}
</style>