<template>
  <div class="flex flex-col">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Item</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Edit</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Delete</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in items" v-bind:key="item.id">
                <td class="px-2 py-4 whitespace-nowrap">
                  <div class="ml-4">
                    <div class="text-xs font-medium text-gray-500">
                      {{ item.translations[lang(item.translations)].title }}
                    </div>
                  </div>
                </td>
                <td class="px-3 py-4 whitespace-nowrap">
                  <div class="ml-4">
                    <div class="text-xs font-medium text-gray-500">
                      <div v-if="item.translations[lang(item.translations)].description">
                        {{ item.translations[lang(item.translations)].description }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-xs leading-snug">
                  <div v-for="amount in item.amounts" v-bind:key="amount.id" class="ml-4">
                    <div v-if="amount.translations[lang(item.translations)]">
                      {{ amount.translations[lang(amount.translations)].description }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-xs leading-snug">
                  <div v-for="amount in item.amounts" v-bind:key="amount.id">
                    {{ amount.price }} kn
                  </div>
                </td>
                <td>
                  <Button btnText="Edit" class="text-center"/>
                </td>
                <td>
                  <Button btnText="Delete" @clicked="alert(item.id)" class="text-center"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button.vue'

export default {
  name: 'Table',
  props: {
    items: undefined,
    selectedLanguage: String
  },
  components: {
    Button
  },
  methods: {
    lang(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    deleteItem(id) {
      this.$service.API.get("/item/" + id)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err);
        });
    },

    alert(id) {
      this.$confirm("Are you sure?").then(() => {
        this.deleteItem(id);
      });
    }
  }
}
</script>
