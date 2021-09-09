<template>
  <div class="relative inline-block text-right">
    <div>
      <button
        type="button"
        @click="show = !show"
        class="inline-flex justify-center w-full rounded-md border border-white shadow px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true">
        <div class="uppercase">
           <div v-if="selectedLanguage.language_code == 'en'">
            <country-flag country='gb' size='small'/>
            {{ language.language_code }}
          </div>
          <div v-else-if="selectedLanguage.language_code">
            <country-flag :country='selectedLanguage.language_code' size='small'/>
            {{ selectedLanguage.language_code }}
          </div>
        </div>
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div
      v-if="show"
      class="origin-top-right absolute right-0 mt-2 w-15 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1">
      <div class="py-1" role="none">
        <div
          v-for="language in languages" v-bind:key="language.id"
          class="text-gray-700 uppercase block px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer"
          role="menuitem"
          tabindex="-1"
          :id="language.language_name"
          @click="show = !show,
          selectedLanguage.language_name = language.language_name,
          changeLanguage()">
          <div v-if="language.language_code == 'en'">
            <country-flag country='gb' size='small'/>
            {{ language.language_code }}
          </div>
          <div v-else-if="language.language_code">
            <country-flag :country='language.language_code' size='small'/>
            {{ language.language_code }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountryFlag from 'vue-country-flag'

export default {
  name: 'LanguageDropdown',
  props: {
    languages: Array
  },

  data() {
    return {
      show: false,
      selectedLanguage: {
        'language_code': 'hr',
        'language_name': 'Hrvatski'
      }
    }
  },

  components: {
    CountryFlag
  },

  methods: {
    changeLanguage() {
      this.$emit('clicked', { 'selectedLanguage': this.selectedLanguage});
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
