<template>
  <div class="px-16 py-8">
    <div class="pb-6 pt-5 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      New Restaurant
    </div>
    <div class="pb-6">
      <div class="flex space-x-2 pb-4 content-center">
        <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
          Languages
        </label>
      </div>

      <select @change="addNew()" v-model="selectedLanguage" class="m-2 p-2 text-left text-1xl capitalize font-medium text-gray-500 uppercase tracking-wider border border-gray-600 rounded">
        <option
          v-for="language in availableLanguages" 
          :key="language.id"
        > 
          {{ language.language_name }} 
        </option>
      </select>
    </div>

    <div class="pb-4">
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Currency
      </label>
      <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        name="input"
        v-model="currency"
        placeholder="Currency"
      />
    </div>

    <div class="py-4">
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Name
      </label>
      <!-- <TranslationInput v-for="language in languages" :key="language.language_code" :languageCode="language.language_code" :translations="restaurantNames" class="pt-2"/> -->
      <div v-for="language in selectedLanguages" :key="language.id">
        <label for="languageName" class="block text-gray-700 text-xs mb-2 uppercase"> {{ language }}</label>
        <input v-model="restaurantNames[language]" name="languageName" type="text" class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
    </div>

    <div class="py-4">
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Footer
      </label>
      <div v-for="language in selectedLanguages" :key="language.id">
        <label for="languageName" class="block text-gray-700 text-xs mb-2 uppercase"> {{ language }}</label>
        <input v-model="restaurantFooters[language]" name="languageName" type="text" class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
      </div>
    </div>

    <div  class="px-6 py-4 flex-1">
      <div class="px-6 flex flex-wrap justify-end">
        <div class="p-1.5">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="createNewRestaurant()">Save</button>
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
  name: 'RestaurantForm',
  data() {
    return {
      unfilteredLanguages: undefined,
      filteredLanguages: undefined,
      availableLanguages: undefined,
      currency: undefined,
      languageNumber: 1,
      selectedLanguage: {},
      selectedLanguages: [ 'Hrvatski' ],
      restaurantNames: { 'Hrvatski': '' },
      restaurantFooters: { 'Hrvatski': '' }
    }
  },

  mounted() {
    this.getLanguages();
  },

  components: {
    TranslationInput
  },

  methods: {
    createNewRestaurant() {
      let self = this;

      this.$service.API.post('/restaurant/new', {
        currency: this.currency,
        names: JSON.stringify(this.restaurantNames),
        footers: JSON.stringify(this.restaurantFooters),
        languages: JSON.stringify(this.selectedLanguages),
        userId: JSON.stringify(this.$service.session.user_id)
      })
      .then(response => {
        console.log(response);
        self.$nextTick(() => {
          self.$emit('restaurant-create', response.data.data.restaurant);
        });
      }, response => {
        console.log(response);
      });
    },

    addNew() {
      console.log(this.selectedLanguage);
      this.selectedLanguages.push(this.selectedLanguage);
      this.restaurantNames[this.selectedLanguage] = "";
      this.restaurantFooters[this.selectedLanguage] = "";
    },

    addNewLanguage() {
      this.languageNumber++;
      console.log('ej');
    },

    getLanguages() {
      this.$service.API.get("/languages")
        .then(response => {
          this.unfilteredLanguages = response.data.data.languages;
          this.filteredLanguages = this.unfilteredLanguages.filter( language => language.language_name.toLowerCase() !== 'hrvatski'); 
          console.log(this.filteredLanguages);
          this.availableLanguages = this.filteredLanguages;
          // this.populateLanguages();
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
}
</script>
