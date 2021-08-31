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
        Subtitles
      </div>
      <TranslationInput v-for="language in languages" :languageCode="language.language_code" :key="language.language_code" :translations="subtitles" class="mb-4 flex-row" />
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
          <button @click="type == 'New' ? addNewAmount() : addNewAmountForUpdate()" class="bg-gray-500 hover:bg-gray-700 text-s px-1 py-1 rounded-full text-white items-center justify-center transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Amount -->
    <div v-for="(amount, index) in itemAmounts" :key="index" class="px-6">
      <div class="py-2 flex mb-6">
        Amount
        <div class="pl-1">
          <button @click="type == 'New' ? removeNewAmount(index) : removeAmountForUpdate(amount.id)" class="bg-gray-500 hover:bg-gray-700 text-s px-1  py-1 rounded-full text-white items-center justify-center transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
            </svg>
          </button>
        </div>
      </div>
      <span v-if="priceRequiredMessage" class="border-solid border-2 rounded border-red-600 text-red-400 p-3.5"> {{ priceRequiredMessage }} </span>
      <label class="block text-gray-700 text-xs mb-2 uppercase mt-6" for="input">
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
    <div  class="px-6 flex flex-wrap justify-end">
      <div v-if="type == 'Edit'" class="p-1.5">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="updateItem()">Update</button>
      </div>
      <div v-else class="p-1.5">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="createNewItem()">Save</button>
      </div>
      <div class="p-1.5">
        <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded transition-colors duration-300" @click="$emit('close')">Cancel</button>
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
    subtitles: undefined,
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
      createdAmount: {},
      priceRequiredMessage: ""
    }
  },

  mounted() {
    if(this.amounts) {
      this.itemAmounts = this.amounts;
    }
  },

  methods: {
    getIndexById(id, parent) {
      const index = parent.findIndex(item => item.id === id);
      return index;
    },

    createNewItem() {
      let self = this;

      this.$service.API.post('/subcategory/' + this.parent + '/item' ,{
        titles: JSON.stringify(this.titles),
        subtitles: JSON.stringify(this.subtitles),
        descriptions: JSON.stringify(this.descriptions),
        amounts: JSON.stringify(this.itemAmounts)
      })
      .then(response => {
        this.priceRequiredMessage = response.data.message;
        if (response.data.data.newItem) {
          self.$nextTick(() => {
            self.$emit('item-create', {item: response.data.data.newItem, categoryId: response.data.data.categoryId});
          });
        }
      })
      .catch(error => {
        console.log(this.priceRequiredMessage);
      });
    },

    updateItem() {
      let self = this;

      this.$service.API.post('/item/update/' + this.parent ,{
        titles: JSON.stringify(this.titles),
        subtitles: JSON.stringify(this.subtitles),
        descriptions: JSON.stringify(this.descriptions),
        amounts: this.itemAmounts
      })
      .then(response => {
        this.priceRequiredMessage = response.data.message;
        self.$emit('item-update', {item: response.data.data.updatedItem, categoryId: response.data.data.categoryId});
      })
      .catch(error => {
        console.log(this.priceRequiredMessage);
      });
    },

    addNewAmountForUpdate() {
      let self = this;

      this.$service.API.post('/item/' + this.parent + '/amount', {
        languages: this.languages,
      })
      .then(response => {
        self.$nextTick(() => {
          const newAmount = response.data.data.amount;
          self.amounts.push(
              {
                'id' : newAmount.id,
                'price' : newAmount.price,
                'translations' : Object.assign({}, ...self.languages.map(x => ({ [x.language_code]: self.amountDescriptionExists(newAmount.translations, x.language_code) })))
              }
            );

          console.log(self.amounts);
        });
      }, response => {
        console.log(response);
      });
    },

    removeAmountForUpdate(id) {
      let self = this;

      console.log('dobiveni id ', id);
      if(this.itemAmounts.length > 1) {
        this.$service.API.get('/delete/amount/' + id)
         .then(response => {
            self.$nextTick(() => {
              let index = this.getIndexById(id, this.amounts);
              self.amounts.splice(index, 1);
            });
          }, response => {
            console.log(response);
          });
      }
    },

    removeNewAmount(index) {
      if(this.itemAmounts.length > 1) {
        this.itemAmounts.splice(index, 1);
      }
    },

    addNewAmount() {
      this.itemAmounts.push(
        {
          'price' : '',
          'translations':  this.languages.reduce((acc, curr) => ({ ...acc, [curr.language_code]: '' }), {})
        }
      );
    },

    amountDescriptionExists(translations, languageCode) {
      let description = '';

      translations.forEach(translation => {
        if(translation.language_code == languageCode) {
          description = translation.description;
        }
      });

      return description;
    },
  }
}
</script>
