<template>
  <div class="flex items-center">
    <div class="relative inline-block w-20 h-10">
      <span
        :class="[
          'absolute top-0 left-0 w-10 h-10 rounded-full shadow-lg transition-transform duration-300 ease-in-out',
          'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
          currentLanguage === 'en' ? '' : 'translate-x-10',
        ]"
      ></span>

      <div class="w-full h-full rounded-full shadow-inner"></div>

      <button
        class="absolute top-0 left-0 w-10 h-10 rounded-full text-xs font-semibold text-white z-10 hover:bg-white/20 transition duration-200 cursor-pointer"
        @click="changeLanguage('en')"
      >
        EN
      </button>
      <button
        class="absolute top-0 right-0 w-10 h-10 rounded-full text-xs font-semibold text-white z-10 hover:bg-white/20 transition duration-200 cursor-pointer"
        @click="changeLanguage('it')"
      >
        IT
      </button>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { ref, watch } from 'vue'

const { locale } = useI18n()

const currentLanguage = ref(locale.value)

function changeLanguage(lang) {
  locale.value = lang
}

watch(
  () => locale.value,
  newLang => {
    currentLanguage.value = newLang
  }
)
</script>
