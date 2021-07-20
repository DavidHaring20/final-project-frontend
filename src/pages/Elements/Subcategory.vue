<template>
  <div>
    <div class="flex">
      {{ subcategory.translations[languageIndex(subcategory.translations)].name }}

      <!-- Edit subcategory -->
      <Button btnText="Edit" @clicked="emitShowEditModal(subcategory, subcategory.translations, 'Subcategory')" class="text-center pl-2"/>
      <!-- Delete subcategory -->
      <Button btnText="Delete" @clicked="emitDelete(subcategory.id, 'subcategory')" class="px-2" />
    </div>
      <ItemsTable
        :items="subcategory.items"
        :selectedLanguage="selectedLanguage"
        @edit="emitItemEdit($event)"
        @delete="emitDelete($event.id, $event.title)"
        class="w-full"
      />
      <!-- New item -->
      <Button btnText="Add" @clicked="emitAddItem(subcategory, 'Item')" class="px-8"/>
  </div>
</template>

<script>
import ItemsTable from './ItemsTable.vue'
import Button from './Button.vue'

export default {
  name: 'Subcategory',

  components: {
    ItemsTable,
    Button
  },

  props: {
    subcategory: undefined,
    selectedLanguage: String
  },

  methods: {
    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    emitAddItem(item, title) {
      this.$emit('add', {item, title});
    },

    emitItemEdit(item) {
      this.$emit('itemEdit', item);
    },

    emitShowEditModal(subcategory, translations, title) {
      this.$emit('edit', {subcategory, translations, title});
    },

    emitDelete(id, title) {
      this.$emit('delete', {id, title});
    }
  }
}
</script>
