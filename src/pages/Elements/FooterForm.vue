<template>
  <div class="pl-6 py-2">
    <div class="px-6 pt-10 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      Edit Footer
    </div>

    <div  class="px-6 py-4 flex-1">
      <TranslationInput v-for="language in languages" :languageCode="language.language_code" :key="language.language_code" :translations.sync="translations" class="mb-4 flex-row" />
        <div class="px-6 flex flex-wrap justify-end">
          <div class="p-1.5">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="updateFooter()">Update</button>
          </div>
          <div class="p-1.5">
            <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded transition-colors duration-300" @click="$emit('close')">Cancel</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TranslationInput from '../../components/TranslationInput.vue'

export default {
  name: 'FooterForm',
  props: {
    parent: undefined,
    languages: undefined,
    translations: undefined
  },

  components: {
    TranslationInput
  },

  methods: {
    updateFooter() {
      let self = this;

      this.$service.API.post('/restaurant/'+ this.parent + '/edit-footer', {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
          self.$nextTick(() => {
            //self.$emit('footer-update', response.data.data.category);
          });
        }, response => {
        console.log(response);
      });
    },
  }
}
</script>
