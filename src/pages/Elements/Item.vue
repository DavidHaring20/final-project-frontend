<template>
  <draggable tag="tbody" v-model="itemsArray" class="bg-white divide-y divide-gray-200">
    <tr v-for="item in itemsArray" :key="item.id" class="h-12">
      <td class="px-2 py-4 whitespace-nowrap">
        <div class="ml-4">
          <div class="text-xs font-medium text-gray-500">
            {{ item.translations[languageIndex(item.translations)].title }}
          </div>
        </div>
      </td>
      <td class="px-3 py-4 break-words">
        <div class="ml-4">
          <div class="text-xs font-medium text-gray-500 max-w-prose">
            <div v-if="item.translations[languageIndex(item.translations)].subtitle">
            {{ item.translations[languageIndex(item.translations)].subtitle }}
            </div>
          </div>
        </div>
      </td>
      <td class="px-3 py-4 break-words">
        <div class="ml-4">
          <div class="text-xs font-medium text-gray-500 max-w-prose">
            <div v-if="item.translations[languageIndex(item.translations)].description">
              {{ item.translations[languageIndex(item.translations)].description }}   
            </div>
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs leading-snug">
        <div v-for="amount in item.amounts" v-bind:key="amount.id" class="ml-4">
          <div v-if="amount.translations[languageIndex(item.translations)]">
            {{ amount.translations[languageIndex(amount.translations)].description }}
          </div>
        </div>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs leading-snug">
        <div v-for="amount in item.amounts" v-bind:key="amount.id">
          {{ amount.price }} kn
        </div>
      </td>
      <td>
        <Button btnText="Edit" @clicked="emitEdit(item.id, 'Item', item)" class="text-center"/>
      </td>
      <td>
        <Button btnText="Delete" @clicked="emitDelete(item.id, 'item')" class="text-center"/>
      </td>
    </tr>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import Button from './Button.vue'

export default {
  name: 'Item',
  components: {
    Button,
    draggable
  },

  props: {
    items: Array,
    selectedLanguage: String
  },

  data() {
    return {
      itemsArray: []
    }
  },
  
  mounted() {
    this.itemsArray = this.items;
  },

  methods: {
    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },
    emitEdit(parent, title, thing) {
      this.$emit('edit', {parent, title, thing});
    },
    emitDelete(id, title) {
      this.$emit('delete', {id, title})
    },
  }
}
</script>