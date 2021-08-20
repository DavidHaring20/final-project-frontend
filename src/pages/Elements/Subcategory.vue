<template>
  <div>
    <div class="flex">
      {{ subcategory.translations[languageIndex(subcategory.translations)].name }}

      <!-- Edit subcategory -->
      <Button btnText="Edit" @clicked="emitShowEditModal(subcategory.id, 'Subcategory', subcategory)" class="text-center pl-2"/>
      <!-- Delete subcategory -->
      <Button btnText="Delete" @clicked="emitDelete(subcategory.id, 'subcategory')" class="px-2" />
    </div>
      <ItemsTable
        :items="subcategory.items"
        :selectedLanguage="selectedLanguage"
        @edit="emitItemEdit($event.parent, $event.title, $event.thing)"
        @delete="emitDelete($event.id, $event.title)"
        class="w-full"
      />
      <!-- New item -->
      <Button btnText="New Item" @clicked="emitItemEdit(subcategory.id, 'Item', '')" class="px-8"/>
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
    styleObject: Object,
    subcategory: undefined,
    selectedLanguage: String
  },

  methods: {
    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    emitAddItem(subcategory, title) {
      this.$emit('add', {subcategory, title});
    },

    emitItemEdit(parentId, title, thing) {
      this.$emit('itemEdit', {parentId, title, thing});
    },

    emitShowEditModal(parentId, title, thing) {
      this.$emit('edit', {parentId, title, thing});
    },

    emitDelete(id, title) {
      this.$emit('delete', {id, title});
    }
  }
}
</script>
