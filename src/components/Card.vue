<template>
    <div class="p-2" @click="isPictureShown = !isPictureShown">
        <div class="flex flex-col h-36 border border-black rounded-lg justify-center bg-transblack overflow-hidden" :class="(isPictureShown)?'bg-white':'bg-transblack'">
          <div class="flex text-4xl h-full items-center justify-center text-white">
            <img v-show="isPictureShown"  class="object-contain max-h-28 max-w-28"
              :src="picture" :alt="secondaryText" />
            <p v-show="!isPictureShown"> {{ primaryText }} </p>
          </div>
          <div class="bg-slate-700 opacity-75 text-white px-2 rounded-lg">{{ secondaryText }}</div>
        </div>
      </div>
</template>

<script setup>
import { ref } from 'vue'
import { onMounted, defineProps } from 'vue';

const isPictureShown = ref(false)

defineProps({
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
})
</script>