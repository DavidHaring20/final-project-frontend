<template>
  <div class="px-10 py-10">
    <div class="px-6 text-left text-4xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      {{ parent.translations[0].name || parent.translations[0].title }}
    </div>
    <div v-if="toEdit != null" class="px-6 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
      Edit {{ title }}
    </div>
    <div v-else class="px-6 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
      New {{ title }}
    </div>

    <div class="justify-start">
      <LanguageDropdown :languages="languages" @clicked="selectedLanguage = $event" class="py-2"/>
    </div>
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
      <div class="px-10 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider flex">
        Amount
        <div class="pl-2">
          <button @click="toEdit ? addNewAmount() : addAmount()" class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div class="pl-1">
          <button @click="removeAmount()" class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>
        <!-- <AmountsDropdown :amounts="parent.amounts" @clicked="selectedAmountIndex = $event" class="py-2"/> -->
    </div>
    <div v-if="toEdit">
      <div v-for="amount in parent.amounts" :key="amount.id">
        <AmountForm :amount="amount" :languages="languages"/>
      </div>
    </div>
    <div v-else>
      <div v-for="index in amountNumber" :key="index">
        <AmountForm :languages="languages" @price-changed="changedPrice"/>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageDropdown from './LanguageDropdown.vue'
import AmountsDropdown from './AmountsDropdown.vue'
import AmountForm from './AmountForm.vue'

export default {
props: {
    title: String,
    parent: undefined,
    languages: undefined,
    toEdit: {
      type: undefined,
      default: null
    },
  },

  components: {
    LanguageDropdown,
    // AmountsDropdown,
    AmountForm
  },

  data() {
    return {
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

      prices: undefined,

      item: {},

      amountNumber: 1,
      selectedLanguage: 'hr',
      createdAmount: {}
    }
  },

  methods: {
    createNewItem() {
      let self = this;

      this.$service.API.post('/subcategory/' + this.parent.id + '/item' ,{
        titles: JSON.stringify(this.title_translations),
        descriptions: JSON.stringify(this.description_translations),
        prices: JSON.stringify(this.price),
        amount_descriptions: this.amount_desc
      })
      .then(response => {
        self.$nextTick(() => {
          self.$emit('item-create', {item: response.data.data.item, categoryId: response.data.data.categoryId});
        });
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

    addNewAmount() {
      if(this.toEdit) {
        let self = this;

        this.$service.API.post('/item/' + this.parent.id + '/amount', {
          languages: this.languages,
        })
        .then(response => {
          self.$nextTick(() => {
            self.parent.amounts.push(response.data.data.amount);
          });
        }, response => {
          console.log(response);
        });
      }

      else {

      }
    },

    addAmount() {
      // this.amount_desc.push(this.languages.reduce((acc, curr) => ({ ...acc, [curr.language_code]: '' }), []));
      this.amountNumber++;
      //this.selectedAmountIndex = this.amount;
    },

    removeAmount() {

    },

    changedPrice(price) {
      this.prices = price;
    },

    close() {
      this.$emit('clicked');
    },
  }
}
</script>
