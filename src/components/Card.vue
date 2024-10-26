<template>
    <div class="p-2 cursor-pointer" @click="flipCard()">
        <div class="flex flex-col h-36 border border-black rounded-lg justify-center bg-transblack overflow-hidden" :class="(isPictureShown)?'bg-white':'bg-transblack'">
          <div class="flex text-4xl h-full items-center justify-center text-white">
            
              <img v-show="isPictureShown"   class="object-contain max-h-28 max-w-28 "
                :src="picture" :alt="secondaryText" />
            
            <p v-show="!isPictureShown"> {{ primaryText }} </p>
          </div>
          <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg">{{ secondaryText }}</div>
        </div>
      </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onActivated, watch } from 'vue'

const props = defineProps({
    primaryText: {
        type: String,
        required: true
    },
    secondaryText: {
        type: String,
        required: true
    },
    picture: {
        type: URL,
        required: false
    },
    showPicture: {
        type: Boolean,
        required: false
    }

})

watch(props.showPicture, (newX) => {
  console.log(`x is ${newX}`)
})



const isPictureShown = ref(false)

function flipCard() {
    this.isPictureShown = !this.isPictureShown
}

</script>

<style scoped>
.card-rotate {
  /* @keyframes duration | timing-function | delay | 
      iteration-count | direction | fill-mode | play-state | name 
    */
  animation: 1s spin;
  animation-timing-function: ease-in, linear, ease-out;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
```