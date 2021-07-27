<template>
  <div class="px-10 py-10">
    <div v-if="type == 'Edit'" class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      Edit Item: {{ titles["hr"] }}
    </div>
    <div v-else class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      New Item
    </div>

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
          <button @click="type == 'New' ? addNewAmount() : addNewAmountForUpdate()" class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Amount -->
    <div v-for="(amount, index) in itemAmounts" :key="index">
      <div class="py-2 flex">
        Amount
        <div class="pl-1">
          <button @click="removeNewAmount(index)" class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
            </svg>
          </button>
        </div>
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
    <div  class="px-6 py-2 flex-1">
      <div v-if="type == 'Edit'" class="p-1.5">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="updateItem()">Update</button>
      </div>
      <div v-else class="p-1.5">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="createNewItem()">Save</button>
      </div>
      <div class="p-1.5">
        <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded" @click="$emit('close')">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
import TranslationInput from '../../components/TranslationInput.vue'

export default {
props: {
    title: String,
    parent: undefined,
    languages: undefined,
    titles: undefined,
    descriptions: undefined,
    amounts: undefined,
    type: String
  },

  components: {
    TranslationInput
  },

  data() {
    return {
      prices: undefined,
      itemAmounts: undefined,
      createdAmount: {}
    }
  },

  mounted() {
    if(this.amounts) {
      this.itemAmounts = this.amounts;
    }
  },

  methods: {
    createNewItem() {
      let self = this;

      this.$service.API.post('/subcategory/' + this.parent + '/item' ,{
        titles: JSON.stringify(this.titles),
        descriptions: JSON.stringify(this.descriptions),
        amounts: JSON.stringify(this.itemAmounts)
      })
      .then(response => {
        self.$nextTick(() => {
          // console.log('item ', response.data.data.updatedItem)
          self.$emit('item-create', {item: response.data.data.newItem, categoryId: response.data.data.categoryId});
        });
      });
    },

    updateItem() {
      let self = this;

      this.$service.API.post('/item/update/' + this.parent ,{
        titles: JSON.stringify(this.titles),
        descriptions: JSON.stringify(this.descriptions),
        amounts: this.itemAmounts
      })
      .then(response => {
          self.$emit('item-update', {item: response.data.data.updatedItem, categoryId: response.data.data.categoryId});
      });
    },

    addNewAmountForUpdate() {
      let self = this;

      this.$service.API.post('/item/' + this.parent + '/amount', {
        languages: this.languages,
      })
      .then(response => {
        self.$nextTick(() => {
          self.amounts.push(response.data.data.amount);
        });
      }, response => {
        console.log(response);
      });
    },

    removeNewAmount(index) {
      delete this.amounts[index];
    },

    close() {
      this.$emit('close');
    },

    addNewAmount() {
      this.itemAmounts.push(
        {
          'price' : '',
          'translations':  this.languages.reduce((acc, curr) => ({ ...acc, [curr.language_code]: '' }), {})
        }
      );
    }
  }
}
</script>
