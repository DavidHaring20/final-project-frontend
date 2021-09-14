<template>
  <div>
  <div class="flex">
      <!-- Move category up/down -->
      <Arrows :numberOfCategories="numberOfCategories" :type="'CategoryArrows'" :index="index" @decrement-category-position="decrementCategoryPosition" @increment-category-position="incrementCategoryPosition"/>

      <div class="flex flex-row items-center">
        {{ category.translations[languageIndex(category.translations)].name }}

        <!-- New subcategory -->
        <Button btnText="Add" @clicked="emitShowAddModal(category.id, 'Subcategory')" class="px-2"/>
        <!-- Edit category -->
        <Button btnText="Edit" @clicked="emitShowEditModal(category.id, 'Category', category)" class="pr-2"/>
        <!-- Delete category -->
        <Button btnText="Delete" @clicked="emitDelete(category.id, 'category')"/>
      </div>
    </div>
      <div v-for="(subcategory, index) in category.subcategories" v-bind:key="subcategory.id">
        <div class="py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider flex">
          <Subcategory
            :index="index"
            :numberOfSubcategories="getNumberOfSubcategories"
            :subcategory="subcategory"
            :selectedLanguage="selectedLanguage"
            @add="emitShowAddModal($event.item, $event.title)"
            @edit="emitShowEditModal($event.parentId, $event.title, $event.thing)"
            @delete="emitDelete($event.id, $event.title)"
            @itemEdit="emitItemEdit($event.parentId, $event.title, $event.thing)"
            @refresh-subcategories-decrement="refreshSubcategoriesDecrement"
            @refresh-subcategories-increment="refreshSubcategoriesIncrement"
            class="w-full"
          />
        </div>
      </div>
  </div>
</template>

<script>
import Subcategory from './Subcategory.vue'
import Button from './Button.vue'
import Arrows from './Arrows.vue'

export default {
  name: 'Category',

  components: {
    Subcategory,
    Button,
    Arrows
  },

  props: {
    styleObject: Object,
    category: undefined,
    selectedLanguage: String,
    index: Number,
    numberOfCategories: Number
  },

  computed: {
    getNumberOfSubcategories: function () {
      return this.category.subcategories.length;
    }
  },

  methods: {
    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    emitShowAddModal(parent, title) {
      this.$emit('new', {parent, title});
    },

    emitShowEditModal(parentId, title, thing) {
      this.$emit('edit', {parentId, title, thing})
    },

    emitDelete(id, title) {
      this.$emit('delete', {id, title})
    },

    emitItemEdit(parentId, title, thing) {
      this.$emit('itemEdit', {parentId, title, thing});
    },

    decrementCategoryPosition() {
      this.$service.API.patch('/decrementCategoryPosition', {
        categoryId: this.category.id
      })
      .then(response => {
        this.$emit('refresh-categories-decrement');
      });
    },

    incrementCategoryPosition() {
      this.$service.API.patch('/incrementCategoryPosition', {
        categoryId: this.category.id
      })
      .then(response => {
        this.$emit('refresh-categories-increment');
      });
    },

    refreshSubcategoriesDecrement() {
      this.$emit('refresh-subcategories-decrement');
    },

    refreshSubcategoriesIncrement() {
      this.$emit('refresh-subcategories-increment');
    }
  }
}
</script>
