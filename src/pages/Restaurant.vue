<template>
  <div class="h-screen w-screen">
    <div v-if="restaurant">
      <Modal :width="500" :scrollable="true" height="auto" name="modal">
          <!-- Modal for adding a new category or updating an existing category -->
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

          <!-- Modal for adding a new subcategory or updating an existing subcategory -->
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

          <!-- Modal for adding a new item or updating an existing item -->
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

          <!-- Modal for updating footer -->
          <div v-else-if="modalTitle == 'Footer'">
            <FooterForm
              :parent="parentId"
              :languages="restaurant.languages"
              :translations="restaurantFooter"
              @footer-update="updateFooter"
              @close="hideModal"
            />
          </div>
        </Modal>

      <div class="mb-auto">
        <!-- Restaurant name, add new category and export to JSON -->
        <div class="px-6 text-5xl font-medium md:text-right font-sans tracking-tighter capitalize subpixel-antialiased text-gray-600 sm:text-center">
          {{ restaurant.translations[0].name }}
          <br>
          <div class="flex-inital justify-end space-x-2">
            <button class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="showNewModal(restaurant.id, 'Category', undefined)">New Category</button>
            <button class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="exportJSON(restaurant.id, restaurant.translations[0].name)">Export To JSON</button>
          </div>
        </div>

        <div class="2xl:px-96 xl:px-72 lg:px-50 md:px-1 sm:px-2">
          <div class="bg-white sm:p-10">
            <!-- Language selection - Dropdown menu -->
            <div class="grid justify-items-end pr-6">
              <LanguageDropdown @clicked="selectedLanguage = $event" :languages="restaurant.languages"/>
            </div>

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

      <!-- Footer -->
      <div class="align-baseline h-full">
        <div class="flex align-baseline">
          <div class="pl-10 py-3 text-left text-2xl font-medium text-gray-500">
            Footer
          </div>
          <Button btnText="Edit" @clicked="showNewModal(restaurant.id, 'Footer', undefined)" class="px-2 pt-5"/>
        </div>
        <div class="bg-indigo-500 rounded-t-lg shadow w-screen h-28">
          <div class="text-center text-white">
            {{ restaurant.translations[languageIndex(restaurant.translations, selectedLanguage)].footer }}
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
import FooterForm from './Elements/FooterForm.vue'
import FileSaver from 'file-saver'

export default {
  name: 'Restaurant',
  path: '/restaurant/:restaurantId',
  layout: require('@/layouts/Base.vue').default,
  components: {
    Category,
    LanguageDropdown,
    Button,
    CategoryForm,
    SubcategoryForm,
    ItemForm,
    FooterForm
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
    },

    restaurantFooter: function() {
      let returnVal = {};
      let restaurant = this.restaurant;

      if(restaurant) {
         restaurant.translations.forEach((translation) =>
          {
            returnVal[translation.language_code] = translation.footer;
          }
        );
      }

      return returnVal;
    }
  },

  methods: {
    getData() {
      this.$service.API.get("/restaurant/show/" + this.$route.params.restaurantId)
        .then(response => {
          this.restaurant = response.data.data.restaurant;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //Find the index of the translation that has the language code == selected language
    languageIndex(translations, language) {
      const index = translations.findIndex(item => item.language_code === language);
      return index;
    },

    //Find the index in the array with the given ID
    getIndexById(id, parent) {
      const index = parent.findIndex(item => item.id === id);
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


    exportJSON(id, name) {
      name = name.replace(/\s+/g, '');
      this.$service.API.get("/export-json/restaurant/" + id)
        .then(response => {
          const data = JSON.stringify(response.data, null, 4);
          const blob = new Blob([data], { type: 'application/json' });
          FileSaver.saveAs(blob, name + `.json`);
        })
        .catch(err => {
          console.log(err);
        });
    },

    //Modals: Category/Subcategory, Item, Hide Modal

    showNewModal (parentId, title, thing) {
      this.parentId = parentId;
      this.modalTitle = title;
      this.thing = thing;

      this.$modal.show('modal');
    },

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

    hideModal () {
      this.$modal.hide('modal');

      this.parentId = null;
      this.thing = null;
      this.modalTitle = null;
      this.type = null;
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

    //Add/update/delete category, subcategory, item and update footer on front

    addNewCategory(category) {
      this.restaurant.categories.push(category);
      this.hideModal();
    },

    updateCategory(category) {
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

    updateFooter(translations) {
      this.restaurant.translations = translations;

      this.hideModal();
    }
  },
}
</script>
