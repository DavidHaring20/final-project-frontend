<template>
  <div>
  <div class="flex">
      {{ category.translations[languageIndex(category.translations)].name }}

      <!-- New subcategory -->
      <Button btnText="Add" @clicked="emitShowAddModal(category, 'Subcategory')" class="px-2"/>
      <!-- Edit category -->
      <Button btnText="Edit" @clicked="emitShowEditModal(category, category.translations, 'Category')" class="pr-2"/>
      <!-- Delete category -->
      <Button btnText="Delete" @clicked="emitDelete(category.id, 'category')"/>
    </div>
      <div v-for="subcategory in category.subcategories" v-bind:key="subcategory.id">
        <div class="px-10 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider flex">
          <Subcategory :subcategory="subcategory" :selectedLanguage="selectedLanguage" @add="emitShowAddModal($event.item, $event.title)" @edit="emitShowEditModal($event.subcategory, $event.translations, $event.title)" @delete="emitDelete($event.id, $event.title)" @itemEdit="emitItemEdit($event)"/>
        </div>
      </div>
  </div>
</template>

<script>
import Subcategory from './Subcategory.vue'
import Button from './Button.vue'

export default {
  name: 'Category',

  components: {
    Subcategory,
    Button
  },

  props: {
    category: undefined,
    selectedLanguage: String,
  },

  methods: {
    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    emitShowAddModal(parent, title) {
      this.$emit('new', {parent, title});
    },

    emitShowEditModal(editData, translation, title) {
      this.$emit('edit', {editData, translation, title})
    },

    emitDelete(id, title) {
      this.$emit('delete', {id, title})
    },

    emitItemEdit(item) {
      this.$emit('itemEdit', item);
    }
  }
}
</script>
