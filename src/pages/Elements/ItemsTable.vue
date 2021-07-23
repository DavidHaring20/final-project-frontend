<template>
  <div class="flex flex-col">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div>
          <table class="min-w-full divide-y divide-gray-200">
            <!-- <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Item</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Amount</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Edit</th>
                <th scope="col" class="px-6 py-3 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Delete</th>
              </tr>
            </thead> -->
            <tbody  v-for="item in items" v-bind:key="item.id" class="bg-white divide-y divide-gray-200">
              <Item
                :item="item"
                :selectedLanguage="selectedLanguage"
                @edit="emitEdit($event)"
                @delete="emitDelete($event.id, $event.title)"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  name: 'ItemsTable',
  props: {
    items: undefined,
    selectedLanguage: String
  },
  components: {
    Item
  },
  methods: {
    lang(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    emitEdit(item) {
      this.$emit('edit', item);
    },

    emitDelete(id, title) {
      this.$emit('delete', {id, title})
    },
  }
}
</script>
