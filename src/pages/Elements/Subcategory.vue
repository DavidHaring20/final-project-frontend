<template>
  <div>
    <div class="flex py-2 sm:px-6 lg:px-8">
      <!-- Move Subcategory up/down -->
      <Arrows :numberOfSubcategories="numberOfSubcategories" :index="index"/>

      <p class="text-sm self-center"> {{ subcategory.translations[languageIndex(subcategory.translations)].name }} </p>

      <!-- Edit subcategory -->
      <Button btnText="Edit" @clicked="emitShowEditModal(subcategory.id, 'Subcategory', subcategory)" class="self-center text-center pl-2"/>
      <!-- Delete subcategory -->
      <Button btnText="Delete" @clicked="emitDelete(subcategory.id, 'subcategory')" class="px-2 self-center" />
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
import Arrows from './Arrows.vue'

export default {
  name: 'Subcategory',

  components: {
    ItemsTable,
    Button,
    Arrows
  },

  props: {
    styleObject: Object,
    subcategory: undefined,
    selectedLanguage: String,
    index: Number,
    numberOfSubcategories: Number
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
