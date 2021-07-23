<template>
  <div>
    <br>
    Amount
    <br><br>
    <div v-if="amount">
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Price
      </label>
      <input
          class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="amount.price"
      />
      <p class="block text-gray-700 text-xs pt-2 uppercase" >
        Description
      </p>
      <div v-for="language in languages" :key="language.id" class="py-2">
        <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
          {{ language.language_code }}
        </label>
        <input
          class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="amount.translations[languageIndex(amount.translations, language.language_code)].description"
        />
      </div>
    </div>

    <div v-else>
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Price
      </label>
      <input
          class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="price"
      />
      <p class="block text-gray-700 text-xs pt-2 uppercase" >
        Description
      </p>
      <div v-for="language in languages" :key="language.id" class="py-2">
        <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
          {{ language.language_code }}
        </label>
        <input
          class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="descriptions[language.language_code]"
        />
          {{descriptions[language.language_code]}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmountForm',

  data() {
    return {
      price: null,

      descriptions:  [{
           ...this.languages.reduce((acc, curr) => ({ ...acc, [curr.language_code]: '' }), [])
         }],
    }
  },

  props: {
    amount: undefined,
    languages: undefined,
  },

  methods: {
    languageIndex(translations, languageCode) {
      const index = translations.findIndex(item => item.language_code === languageCode);
      return index;
    },
  },

  watch: {
    price: {
        handler: function(old_val, new_val) {
          if(old_val != new_val && this.price != null) {
            this.$emit("price-changed", this.price);
          }
        },
        deep: true,
      },
  }
}
</script>
