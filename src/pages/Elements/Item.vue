<template>
  <div class="flex flex-col">

    <div class="flex w-full justify-center">
      <hr class="w-full mb-2">
    </div>

    <div class="flex flex-row">
      <div class="w-3/5 px-6 py-4 text-left tracking-wider text-xs font-medium whitespace-nowrap">
        {{ item.translations[languageIndex(item.translations)].title }}
      </div>
    
      <div class="w-full py-4 px-6 text-left uppercase tracking-wider text-xs font-medium text-gray-700 max-w-prose">
        <div v-if="item.translations[languageIndex(item.translations)].subtitle">
        {{ item.translations[languageIndex(item.translations)].subtitle }}
        </div>
      </div>

      <div class="w-full px-6 text-left tracking-wider text-xs font-medium max-w-prose py-4 break-words">
        <div v-if="item.translations[languageIndex(item.translations)].description">
          {{ item.translations[languageIndex(item.translations)].description }}   
        </div>
      </div>

      <div class="w-2/4 px-6 py-4 text-left tracking-wider  whitespace-nowrap text-xs leading-snug">
        <div v-for="amount in item.amounts" v-bind:key="amount.id">
          <div v-if="amount.translations[languageIndex(item.translations)]">
            {{ amount.translations[languageIndex(amount.translations)].description }}
          </div>
        </div>
      </div>

      <div class="w-2/4 px-6 py-4 text-left tracking-wider  whitespace-nowrap text-xs leading-snug">
        <div v-for="amount in item.amounts" v-bind:key="amount.id">
          {{ amount.price }} kn
        </div>
      </div>

      <div class="w-1/4 px-6 py-4">
        <Button btnText="Edit" @clicked="emitEdit(item.id, 'Item', item)" class="text-center"/>
      </div>

      <div class="w-1/4 px-6 py-4">
        <Button btnText="Delete" @clicked="emitDelete(item.id, 'item')" class="text-center"/>
      </div>
    </div>
  </div>
</template>

<script>

import Button from './Button.vue'

export default {
  name: 'Item',

  components: {
    Button
  },

  props: {
    item: Object,
    selectedLanguage: String
  },

  methods: {
    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },
    emitEdit(parent, title, thing) {
      this.$emit('edit', {parent, title, thing});
    },
    emitDelete(id, title) {
      this.$emit('delete', {id, title})
    }
  }
}
</script>