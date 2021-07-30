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

        <div class="flex-shrink-0">
          <button @click="addNewLanguage()" class="bg-gray-500 hover:bg-gray-700 text-s px-1 py-1 rounded-full text-white items-center justify-center transition-colors duration-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <div class="flex space-x-14">
        <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
          Code
        </label>

        <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
          Language Name
        </label>
      </div>

      <div v-for="language in languages" :key="language.language_code" class="flex space-x-2 py-2">
        <input class="shadow appearance-none border rounded w-20 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="input"
          v-model="language.language_code"
          placeholder="Code"
        />
        <input class="shadow appearance-none border rounded w-40 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="input"
          v-model="language.language_name"
          placeholder="Name"
        />
      </div>
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
      <TranslationInput v-for="language in languages" :key="language.language_code" :languageCode="language.language_code" :translations="restaurantNames" class="pt-2"/>
    </div>

    <div class="py-4">
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Footer
      </label>
      <TranslationInput v-for="language in languages" :key="language.language_code" :languageCode="language.language_code" :translations="restaurantFooters" class="pt-2"/>
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
      languages: [ { "language_code" : "hr", "language_name" : "Hrvatski" } ],
      currency: undefined,
    }
  },

  components: {
    TranslationInput
  },

  computed: {
    restaurantNames: function() {
      let returnVal = {};

      this.languages.forEach((language) =>
        {
          returnVal[language.language_code] = '';
        }
      );

      return returnVal;
    },

    restaurantFooters: function() {
      let returnVal = {};

      this.languages.forEach((language) =>
        {
          returnVal[language.language_code] = '';
        }
      );

      return returnVal;
    }
  },

  methods: {
    createNewRestaurant() {
      let self = this;

      this.$service.API.post('/restaurant/new', {
        currency: JSON.stringify(this.currency),
        names: JSON.stringify(this.restaurantNames),
        footers: JSON.stringify(this.restaurantFooters),
        languages: JSON.stringify(this.languages),
      })
      .then(response => {
        self.$nextTick(() => {
          self.$emit('restaurant-create', response.data.data.restaurant);
        });
      }, response => {
        console.log(response);
      });
    },

    addNewLanguage() {
      this.languages.push(
        {
          'language_code' : '',
          'language_name' : ''
        }
      );
    }
  }
}
</script>
