<template>
  <div>
    <div v-if="restaurant">
      <!-- Modal for adding new items, categories and subcategories -->
      <Modal :scrollable="true" height="auto" name="new">
        <Form :title="modalTitle" :parent="parent" :languages="restaurant.languages" @category-create="addNewCategory" @subcategory-create="addNewSubcategory" @item-create="addNewItem($event.item, $event.categoryId)"/>
      </Modal>

      <!-- Modal for editing subcategories and categories -->
      <Modal :scrollable="true" height="auto" name="edit">
        <Form :title="modalTitle" :parent="parent" :languages="restaurant.languages" :toEdit="toEdit" @clicked="hideModal()"/>
      </Modal>

      <!--Modal for editing items -->
      <Modal :scrollable="true" height="auto" name="editItem">
        <Form :title="modalTitle" :parent="parent" :languages="restaurant.languages" :toEdit="toEdit" :toEditAmounts="toEditAmounts" @clicked="hideModal()"/>
      </Modal>

      <div class="background">
        <!-- Restaurant name and add new category -->
        <div class="px-6 py-3 text-5xl font-medium text-right font-sans font-semibold tracking-tighter capitalize tracking-wider subpixel-antialiased text-gray-600">
          {{ restaurant.translations[languageIndex(restaurant.translations)].name }}
          <Button btnText="Add" @clicked="showNewModal(restaurant, 'Category')"/>
        </div>

        <div class="px-20">
          <div class="bg-white shadow-lg sm:rounded-3xl sm:p-10">
            <!-- Language selectiond - Dropdown menu -->
            <LanguageDropdown @clicked="selectedLanguage = $event" :languages="restaurant.languages"/>
            <!-- Category iteration -->
            <div v-for="category in restaurant.categories" v-bind:key="category.id">
              <div class="px-10 py-3 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider flex">
                <Category
                  :category="category"
                  :selectedLanguage="selectedLanguage"
                  @new="showNewModal($event.parent, $event.title)"
                  @edit="showEditModal($event.editData, $event.translation, $event.title)"
                  @delete="alert($event)"
                  @itemEdit="editItem($event)"
                  class="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../assets/styles/app.css'
import Category from './Elements/Category.vue'
import LanguageDropdown from './Elements/LanguageDropdown.vue'
import Button from './Elements/Button.vue'
import Form from './Elements/Form.vue'

export default {
  path: '/restaurant',
  layout: require('@/layouts/Base.vue').default,
  components: {
    Category,
    LanguageDropdown,
    Button,
    Form
  },

  data() {
    return  {
      restaurant: null,
      selectedLanguage: "hr",
      parent: null,
      toEdit: null,
      toEditAmounts: null,
      modalTitle: String,
    }
  },

  mounted() {
    this.getData();
  },

  methods: {
    getData() {
      this.$service.API.get("/restaurant/show/" + 1)
        .then(response => {
          this.restaurant = response.data.data.restaurant;
        })
        .catch(err => {
          console.log(err);
        });
    },

    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    //Edit Item
    editItem(item) {
      this.toEdit = item.translations;
      this.toEditAmounts = item.amounts;
      this.parent = item;
      this.modalTitle = "Item";

      this.$modal.show('editItem');
    },

    //New Category, Subcategory, Item
    showNewModal (parent, title) {
      this.parent = parent;
      this.modalTitle = title;

      this.$modal.show('new');
    },

    //Edit Category, Subcategory
    showEditModal (editData, translation, title) {
      this.parent = editData;
      this.toEdit = translation;
      this.modalTitle = title;

      this.$modal.show('edit');
    },

    hideModal () {
      this.$modal.hide('new');
      this.$modal.hide('edit');
      this.$modal.hide('editItem');

      this.selected = null;
      this.parent = null;
      this.modalTitle = null;
      this.toEdit = null;
    },

    //Delete Category, Subcategory, Item
    alert(event) {
      this.$confirm("Are you sure?").then(() => {
        this.delete(event.id, event.title);
      });
    },

    delete(id, type) {
      this.$service.API.get("/" + type + "/" + id)
        .then(response => {
        })
        .catch(err => {
          console.log(err);
        });
    },

    addNewCategory(category) {
      this.restaurant.categories.push(category);
      this.hideModal();
    },

    addNewSubcategory(subcategory) {
      this.restaurant.categories[subcategory.category_id - 1].subcategories.push(subcategory);
      this.hideModal();
    },

    addNewItem(item, categoryId) {
      this.restaurant.categories[categoryId - 1].subcategories[item.subcategory_id - 1].items.push(item);
      this.hideModal();
    }
  },
}
</script>

<style scoped>
.background {
  /* background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e3e3e3' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
}
</style>
