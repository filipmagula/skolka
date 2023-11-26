<template>
    <div class="">
      <div class="title text-5xl p-4 text-white">Počítání</div>
      <div class="w-full flex flex-col flex-wrap p-2">
        <div class="">Nic tu není. Zatím ...</div>
        <div
          @click="$emit('showView', 'welcome')"
          class="bg-transblack border-1 rounded-lg p-2 m-2 text-xl text-white"
        >
          Zpět
        </div>
      </div>
    </div>
  </template>
  