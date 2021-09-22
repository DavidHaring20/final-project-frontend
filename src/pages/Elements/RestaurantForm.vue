<template>
  <div class="px-16 py-8">
    <div class="pb-6 pt-5 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      New Restaurant
    </div>
    <div class="pb-6">
      <div class="flex space-x-2 pb-2 content-center">
        <label class="block text-gray-700 text-xs uppercase" for="input">
          Languages
        </label>
      </div>

    <LanguageDropdownRestaurantForm @clicked="selectLanguage($event.selectedLanguage)" :languages="availableLanguages"/>
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

    <hr>

    <div class="py-4">
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Name
      </label>
        <label for="languageName" class="block text-gray-700 text-xs mb-2 uppercase"> Hrvatski </label>
        <input v-model="restaurantName" name="languageName" type="text" class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
    </div>
    
    <hr>

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
import LanguageDropdownRestaurantForm from './LanguageDropdownRestaurantForm.vue';
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
      restaurantName: "",
      restaurantFooters: { 'Hrvatski': '' }
    }
  },

  components: {
    LanguageDropdownRestaurantForm
  },

  mounted() {
    this.getLanguages();
  },

  methods: {
    selectLanguage(language) {
      this.addNew(language);
    }, 
    
    createNewRestaurant() {
      let self = this;

      this.$service.API.post('/restaurant/new', {
        currency: this.currency,
        name: this.restaurantName,
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

    addNew(selectedLanguage) {
      let languageName = selectedLanguage.language_name;

      if (!this.selectedLanguages.includes(languageName)) {
        
        // Add to array and to all objects
        this.selectedLanguages.push(languageName);
        this.restaurantFooters[languageName] = "";
      } else {

        // Remove from an array and from objects
        let selectedLang = this.selectedLanguages.filter(language => language !== languageName);
        this.selectedLanguages = selectedLang;

        delete this.restaurantFooters.languageName;
      }
    },

    getLanguages() {
      this.$service.API.get("/languages")
        .then(response => {
          this.unfilteredLanguages = response.data.data.languages;
          console.log(response.data.data.languages);
          this.filteredLanguages = this.unfilteredLanguages.filter( language => language.language_name.toLowerCase() !== 'hrvatski'); 
          this.availableLanguages = this.filteredLanguages;
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
}
</script>
