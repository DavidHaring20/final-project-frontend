<template>
  <div class="px-10 py-10">

    <!-- Titles and descriptions  -->
    <div  class="px-6 py-1 flex-1">
      <div class="text-left text-m font-medium text-gray-500 uppercase tracking-wider flex" for="input">
        Titles
      </div>
      <TranslationInput v-for="language in languages" :languageCode="language.language_code" :key="language.language_code" :translations="titles" class="mb-4 flex-row" />
    </div>
    <div  class="px-6 py-1 flex-1">
      <div class="text-left text-m font-medium text-gray-500 uppercase tracking-wider flex" for="input">
        Descriptions
      </div>
      <TranslationInput  v-for="language in languages" :languageCode="language.language_code" :key="language.language_code" :translations="descriptions" class="mb-4 flex-row" />
    </div>

    <!-- Amounts header  -->
    <br><br><hr>
    <div class="flex">
      <div class="px-6 py-3 text-left text-m font-medium text-gray-500 uppercase tracking-wider flex">
        Amounts
        <div class="pl-2">
          <button class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div class="pl-1">
          <button class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div v-for="amount in amounts" :key="amount.id">
    </div>

    <!-- Amount -->
    <div v-for="amount in amounts" :key="amount.id">
      <div class="py-2">
        Amount
      </div>
      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Price
      </label>
      <input
        class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        v-model="amount.price"
      />

      <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
        Description
      </label>
      <TranslationInput v-for="language in languages" :languageCode="language.language_code" :key="language.id" :translations.sync="amount.translations" class="py-2" />
    </div>

    <!-- Buttons -->
    <div  class="px-6 py-4 flex-1">
      <div class="p-1.5">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="updateItem()">Update</button>
      </div>
      <div class="p-1.5">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="createNewItem()">Save</button>
      </div>
      <div class="p-1.5">
        <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import AmountsDropdown from './AmountsDropdown.vue'
import TranslationInput from '../../components/TranslationInput.vue'

export default {
props: {
    title: String,
    parent: undefined,
    languages: undefined,
    titles: undefined,
    descriptions: undefined,
    amounts: undefined
  },

  components: {
    // AmountsDropdown,
    TranslationInput
  },

  data() {
    return {
      prices: undefined,

      item: {},

      amountNumber: 1,
      createdAmount: {}
    }
  },

  methods: {
    createNewItem() {
      let self = this;

      this.$service.API.post('/subcategory/' + this.parent + '/item' ,{
        titles: JSON.stringify(this.titles),
        descriptions: JSON.stringify(this.descriptions),
        amounts: JSON.stringify(this.amounts)
      })
      .then(response => {
        self.$nextTick(() => {
          // self.$emit('item-create', {item: response.data.data.item, categoryId: response.data.data.categoryId});
        });
      });
    },

    updateItem() {
      this.$service.API.post('/item/update/' + this.parent.id ,{
        titles: JSON.stringify(this.title_translations),
        descriptions: JSON.stringify(this.description_translations),
        amounts: JSON.stringify(this.amounts)
      })
      .then(response => {
      });
    },

    addNewAmountForUpdate() {
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
    },

    addNewAmount() {
      // this.amount_desc.push(this.languages.reduce((acc, curr) => ({ ...acc, [curr.language_code]: '' }), []));
      this.amountNumber++;
      //this.selectedAmountIndex = this.amount;
    },

    removeNewAmount() {

    },

    close() {
      this.$emit('close');
    },
  }
}
</script>
