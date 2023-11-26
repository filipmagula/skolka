<template>
    <div class="w-full">
        <div class="title text-5xl p-4 text-white">Zábavná školka</div>
        <div class="w-full flex flex-row flex-wrap p-2">
            <div class="basis-1/2 p-2" @click="$emit('showView','colors')">
                <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
                    <div class="flex text-4xl h-full items-center justify-center text-white">
                        <img src="../assets/iconColors.png" alt="Barvy" class="h-14">
                    </div>
                    <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg"> Barvy </div> 

                </div>
            </div>
            <div class="basis-1/2 p-2" @click="$emit('showView','numbers')">
                <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
                    <div class="flex text-4xl h-full items-center justify-center text-white">
                        <img src="../assets/iconNumbers.png" alt="Čísla" class="h-14">
                    </div>
                    <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg"> Čísla </div> 
                </div>
            </div>
            <div class="basis-1/2 p-2" @click="$emit('showView','letters')">
                <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
                    <div class="flex text-4xl h-full items-center justify-center text-white">
                        <img src="../assets/iconLetters.png" alt="Čísla" class="h-14">
                    </div>
                    <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg"> Písmena </div> 
                </div>
            </div>
            <div class="basis-1/2 p-2" @click="$emit('showView','shapes')">
                <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
                    <div class="flex text-4xl h-full items-center justify-center text-white">
                        <img src="../assets/iconShapes.png" alt="Tvary" class="h-14">
                    </div>
                    <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg"> Tvary </div> 
                </div>
            </div>
            <div class="basis-1/2 p-2" @click="$emit('showView','counting')">
                <div class="flex flex-col h-28 border border-black rounded-lg justify-center bg-transblack">
                    <div class="flex text-4xl h-full items-center justify-center text-white">
                        <img src="../assets/iconCounting.png" alt="Počítání" class="h-10">
                    </div>
                    <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg"> Počítání </div> 
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            greeting: 'Ahoj, pojďme si hrát!',
            voice: null,
        };
    },
    created() {
        this.setVoice();
        this.speakGreetings();
    },

    methods: {

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
    },
};
</script>
  
<style scoped>

</style>