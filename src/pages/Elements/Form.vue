<template>
  <div class="px-10 py-10">
    <!-- TITLE -->
    <div class="px-6 text-left text-4xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      {{ parent.translations[0].name || parent.translations[0].title }}
    </div>
    <div v-if="toEdit != null" class="px-6 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
      Edit {{ title }}
    </div>
    <div v-else class="px-6 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
      New {{ title }}
    </div>

    <!-- CATEGORIES & SUBCATEGORIES  -->
    <div v-if="title == 'Subcategory' || title == 'Category'" class="flex-1">
      <div  class="px-6 py-4">
        <div v-for="translation in parent.translations" v-bind:key="translation.id" class="mb-4 flex-row">
          <label class="block text-gray-700 text-xs font-bold mb-2 uppercase" for="input">
            {{translation.language_code}}
          </label>
          <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="input"
            v-model="translations[translation.language_code]"
            placeholder="Title" />
        </div>

          <div class="px-6 flex flex-wrap">
          <div v-if="toEdit" class="p-1.5">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="title == 'Subcategory' ? updateSubcategory() : updateCategory(), close()">Update</button>
          </div>
          <div v-else class="p-1.5">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="title == 'Subcategory' ? createNewSubcategory() : createNewCategory(), close()">Save</button>
          </div>
          <div class="p-1.5">
            <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded" @click="close()">Cancel</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ITEMS -->

    <div v-else-if="title == 'Item'">
      <LanguageDropdown :languages="languages" @clicked="selectedLanguage = $event"/>
      <label class="block py-1 text-gray-700 text-xs mb-2 uppercase" for="input">
        Title ({{ selectedLanguage }})
      </label>
      <input
        class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        v-model="title_translations[selectedLanguage]"
      />

      <label class="block py-1 text-gray-700 text-xs mb-2 uppercase" for="input">
        Description ({{ selectedLanguage }})
      </label>
      <input
        class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        v-model="description_translations[selectedLanguage]"
      />

      <br><br><hr>
      <div class="flex">
        <div class="px-10 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider">
          Amount {{selectedAmountIndex}}
          <button @click="addAmount()" class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
          <button @click="removeAmount()" class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
            </svg>
          </button>
        </div>
          <AmountsDropdown :amount="amount" @clicked="selectedAmountIndex = $event"/>
      </div>
      <div>
        <label class="block py-1 text-gray-700 text-xs mb-2 uppercase" for="input">
          Price
        </label>
        <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          v-model="price[selectedAmountIndex]" />

        <div v-for="language in languages" v-bind:key="language.id">
          <label class="block py-1 text-gray-700 text-xs mb-2 uppercase" for="input">
            Description ({{ language.language_code }})
          </label>
          <input
            class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="amount_desc[selectedAmountIndex - 1][language.language_code]"
          />
        </div>
      </div>
      <div class="px-6 flex flex-wrap">
        <div v-if="toEdit" class="p-1.5">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="updateItem(), close()">Update</button>
        </div>
        <div v-else class="p-1.5">
          <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="createNewItem(), close()">Save</button>
        </div>
        <div class="p-1.5">
          <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded" @click="close()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from './LanguageDropdown.vue'
import AmountsDropdown from './AmountsDropdown.vue'

export default {
  props: {
    title: String,
    parent: undefined,
    languages: undefined,
    toEdit: {
      type: undefined,
      default: null
    },
    toEditAmounts: {
      type: undefined,
      default: null
    }
  },

  components: {
    LanguageDropdown,
    AmountsDropdown
  },

  data() {
    return {
      //For adding/editing new categories and subcategories:
      translations: this.toEdit ? Object.keys(this.toEdit).map(key => ({[this.toEdit[key].language_code] : this.toEdit[key].name})).reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {}) : {},

      //For adding/editing a new item:
      title_translations: this.toEdit ? Object.keys(this.toEdit).map(key => ({[this.toEdit[key].language_code] : this.toEdit[key].title})).reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {}) : {},
      description_translations: this.toEdit ? Object.keys(this.toEdit).map(key => ({[this.toEdit[key].language_code] : this.toEdit[key].description})).reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {}) : {},
      price: this.toEditAmounts ? Object.keys(this.toEditAmounts).map(key => ({[parseInt(key)+1] : this.toEditAmounts[key].price})).reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {}) : {},

      amount_desc : this.toEditAmounts ?
        Object.keys(this.toEditAmounts).map(key => (
            Object.keys(this.toEditAmounts[key].translations).map(key2 =>
              ({[this.toEditAmounts[key].translations[key2].language_code] : this.toEditAmounts[key].translations[key2].description})).reduce(function(result, item) {
                var key = Object.keys(item)[0];
                result[key] = item[key];
                return result;
            },{})
          )) :
        [{
          ...this.languages.reduce((acc, curr) => ({ ...acc, [curr.language_code]: '' }), [])
        }],

      amount: this.toEditAmounts ? this.toEditAmounts.length : 1,
      selectedLanguage: 'hr',
      selectedAmountIndex: 1,
    }
  },

  methods: {
    //CATEGORY
    createNewCategory() {
      this.$service.API.post('/restaurant/' + this.parent.id + '/category', {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        console.log(response.body);
      }, response => {
        console.log(response);
      });
    },

    updateCategory() {
      this.$service.API.post('/category/update/' + this.parent.id, {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        console.log(response.body);
      }, response => {
        console.log(response);
      });
    },

    //SUBCATEGORY
    createNewSubcategory() {
      this.$service.API.post('/category/' + this.parent.id + '/subcategory', {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        console.log(response.body);
      }, response => {
        console.log(response);
      });

      this.$emit('subcategory', {translations: this.translations, parentId: this.parent.id});
    },

    updateSubcategory() {
      this.$service.API.post('/subcategory/update/' + this.parent.id, {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        console.log(response.body);
      }, response => {
        console.log(response);
      });
    },

    //ITEM
    createNewItem() {
      this.$service.API.post('/subcategory/' + this.parent.id + '/item' ,{
        titles: JSON.stringify(this.title_translations),
        descriptions: JSON.stringify(this.description_translations),
        prices: JSON.stringify(this.price),
        amount_descriptions: this.amount_desc
      })
      .then(response => {
      });
    },

    updateItem() {
      this.$service.API.post('/item/update/' + this.parent.id ,{
        titles: JSON.stringify(this.title_translations),
        descriptions: JSON.stringify(this.description_translations),
        prices: JSON.stringify(this.price),
        amount_descriptions: this.amount_desc
      })
      .then(response => {
      });
    },

    addAmount() {
      this.amount_desc.push(this.languages.reduce((acc, curr) => ({ ...acc, [curr.language_code]: '' }), []));
      this.amount++;
      this.selectedAmountIndex = this.amount;
    },

    removeAmount() {
      if(this.amount > 1) {
        this.selectedAmountIndex = 1;
        this.amount_desc.pop();
        this.amount--;
      }
    },

    close() {
      this.$emit('clicked');
    },
  },
}
</script>
