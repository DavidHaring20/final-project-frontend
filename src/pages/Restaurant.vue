<template>
  <div>
    <div v-if="restaurant">
      <Modal :width="500" :scrollable="true" height="auto" name="modal">
          <div v-if="modalTitle == 'Category'">
            <CategoryForm
              :title="modalTitle"
              :parent="parentId"
              :languages="restaurant.languages"
              :translations="thingTranslations"
              @category-create="addNewCategory"
              @category-update="updateCategory"
              @close="hideModal"
            />
          </div>

          <div v-else-if="modalTitle == 'Subcategory'">
            <SubcategoryForm
              :title="modalTitle"
              :parent="parentId"
              :languages="restaurant.languages"
              :translations="thingTranslations"
              @subcategory-create="addNewSubcategory"
              @subcategory-update="updateSubcategory"
              @close="hideModal"
            />
          </div>

          <div v-else-if="modalTitle == 'Item'">
            <ItemForm
              :title="modalTitle"
              :parent="parentId"
              :languages="restaurant.languages"
              :titles="itemTitles"
              :descriptions="itemDescriptions"
              :amounts="itemAmounts"
              :type="type"
              @item-create="addNewItem($event.item, $event.categoryId)"
              @item-update="updateItem($event.item, $event.categoryId)"
              @close="hideModal"
            />
          </div>
        </Modal>

      <!-- Restaurant name and add new category -->
      <div class="px-6 text-5xl font-medium text-right font-sans font-semibold tracking-tighter capitalize tracking-wider subpixel-antialiased text-gray-600">
        {{ restaurant.translations[0].name }}
        <Button btnText="New Category" @clicked="showNewModal(restaurant.id, 'Category', undefined)"/>
      </div>

      <div class="px-20">
        <div class="bg-white sm:p-10">
          <!-- Language selectiond - Dropdown menu -->
          <LanguageDropdown @clicked="selectedLanguage = $event" :languages="restaurant.languages"/>
          <!-- Category iteration -->
          <div v-for="category in restaurant.categories" v-bind:key="category.id">
            <div class="py-3 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider flex">
              <Category
                :category="category"
                :selectedLanguage="selectedLanguage"
                @new="showNewModal($event.parent, $event.title, undefined)"
                @edit="showNewModal($event.parentId, $event.title, $event.thing)"
                @delete="alert($event)"
                @itemEdit="showItemModal($event.parentId, $event.title, $event.thing)"
                class="w-full"
              />
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
import CategoryForm from './Elements/CategoryForm.vue'
import SubcategoryForm from './Elements/SubcategoryForm.vue'
import ItemForm from './Elements/ItemForm.vue'

export default {
  path: '/restaurant',
  layout: require('@/layouts/Base.vue').default,
  components: {
    Category,
    LanguageDropdown,
    Button,
    CategoryForm,
    SubcategoryForm,
    ItemForm
  },

  data() {
    return  {
      restaurant: null,
      selectedLanguage: "hr",
      parentId: null,
      thing: null,
      item: null,
      modalTitle: String,
      type: String,
    }
  },

  mounted() {
    this.getData();
  },

  computed: {
    thingTranslations: function() {
      let returnVal = {};
      let thing = this.thing;
      this.restaurant.languages.forEach((language) =>
        {
          returnVal[language.language_code] = thing ? thing.translations[this.languageIndex(thing.translations, language.language_code)].name : '';
        }
      );
      return returnVal;
    },

    itemTitles: function() {
      let returnVal = {};
      let item = this.item;
      this.restaurant.languages.forEach((language) =>
        {
          returnVal[language.language_code] = item ? item.translations[this.languageIndex(item.translations, language.language_code)].title : '';
        }
      );
      return returnVal;
    },

    itemDescriptions: function() {
      let returnVal = {};
      let item = this.item;
      this.restaurant.languages.forEach((language) =>
        {
          returnVal[language.language_code] = item ? item.translations[this.languageIndex(item.translations, language.language_code)].description : '';
        }
      );
      return returnVal;
    },

    itemAmounts: function() {
      let returnVal = [];
      let item = this.item;

      if(item) {
        item.amounts.forEach((amount) =>
          {
            returnVal.push(
              {
                'id' : amount.id,
                'price' : amount.price,
                'translations' : Object.assign({}, ...this.restaurant.languages.map(x => ({ [x.language_code]: this.amountDescriptionExists(amount.translations, x.language_code) })))
              }
            );
          }
        );
      }

      else {
        returnVal[0] = {
              'price' : '',
              'translations' : {}
            }

        this.restaurant.languages.forEach((language) => {
          returnVal[0].translations[language.language_code] = '';
        });
      }

      return returnVal;
    }
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

    languageIndex(translations, language) {
      const index = translations.findIndex(item => item.language_code === language);
      return index;
    },

    getIndexById(id, parent) {
      const index = parent.findIndex(item => item.id === id);
      console.log('Tu sam, ovo je indeks: ', index);
      return index;
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

    //Item
    showItemModal(parentId, title, thing) {
      this.parentId = parentId;
      this.modalTitle = title;
      this.item = thing;

      if(this.item) {
        this.type = "Edit";
      }
      else {
        this.type = "New"
      }

      this.$modal.show('modal');
    },

    showNewModal (parentId, title, thing) {
      this.parentId = parentId;
      this.modalTitle = title;
      this.thing = thing;

      this.$modal.show('modal');
    },

    hideModal () {
      this.$modal.hide('modal');

      this.thing = null;
      this.parentId = null;
      this.modalTitle = null;
    },

    //Delete Category, Subcategory, Item
    alert(event) {
      this.$confirm("Are you sure?").then(() => {
        this.delete(event.id, event.title);
      });
    },

    delete(id, type) {
      this.$service.API.get("/delete/" + type + "/" + id)
        .then(response => {
          if(type == "category") {
            this.deleteCategory(id);
          }
          else if(type == "subcategory") {
            this.deleteSubcategory(id);
          }
          else if(type == 'item') {
            this.deleteItem(id);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    addNewCategory(category) {
      console.log(category);
      this.restaurant.categories.push(category);
      this.hideModal();
    },

    updateCategory(category) {
      console.log(category);
      this.restaurant.categories = this.restaurant.categories.map(obj => (obj.id == category.id ? category : obj));
      this.hideModal();
    },

    deleteCategory(id) {
      let index = this.getIndexById(id, this.restaurant.categories);
      this.restaurant.categories.splice(index, 1);
    },

    addNewSubcategory(subcategory) {
      this.restaurant.categories[this.getIndexById(subcategory.category_id, this.restaurant.categories)].subcategories.push(subcategory);
      this.hideModal();
    },

    updateSubcategory(subcategory) {
      this.restaurant.categories[this.getIndexById(subcategory.category_id, this.restaurant.categories)].subcategories = this.restaurant.categories[this.getIndexById(subcategory.category_id, this.restaurant.categories)].subcategories.map(obj => (obj.id == subcategory.id ? subcategory : obj));
      this.hideModal();
    },

    deleteSubcategory(id) {
      this.restaurant.categories.forEach((category) => {
        if(this.getIndexById(id, category.subcategories) >= 0) {
          let index = this.getIndexById(id, category.subcategories);
          category.subcategories.splice(index, 1);
        }
      });
    },

    addNewItem(item, categoryId) {
      let catId = this.getIndexById(categoryId, this.restaurant.categories);
      let subId = this.getIndexById(item.subcategory_id, this.restaurant.categories[catId].subcategories);

      this.restaurant.categories[catId].subcategories[subId].items.push(item);
      this.hideModal();
    },

    updateItem(item, categoryId) {
      let catId = this.getIndexById(categoryId, this.restaurant.categories);
      let subId = this.getIndexById(item.subcategory_id, this.restaurant.categories[catId].subcategories);

      this.restaurant.categories[catId].subcategories[subId].items = this.restaurant.categories[catId].subcategories[subId].items.map(obj => (obj.id == item.id ? item : obj));

      this.hideModal();
    },

    deleteItem(id) {
      this.restaurant.categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          if(this.getIndexById(id, subcategory.items) >= 0) {
          let index = this.getIndexById(id, subcategory.items);
          subcategory.items.splice(index, 1);
          }
        });
      });
    },
  },
}
</script>

