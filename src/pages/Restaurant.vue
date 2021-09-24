<template>
  <div class="h-screen">
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
              @refesh-by-new-category="getData()"
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
              :subtitles="itemSubtitles"
              :descriptions="itemDescriptions"
              :amounts="itemAmounts"
              :type="type"
              @item-create="addNewItem($event.item, $event.categoryId)"
              @item-update="updateItem($event.item, $event.categoryId)"
              @refresh-items="getData()"
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
          
          <!-- Modal for Editing social -->
          <div v-else-if="modalTitle == 'Social'">
            <SocialForm 
            :restaurantId="parentId"></SocialForm>
          </div>

          <!-- Modal for adding a Creating new Style, Deleting Style or Updating Style -->
          <div v-else-if="modalTitle == 'Style'">
            <StyleForm
              :restaurantId="parentId"
              @style-select="selectStyle($event.styleId)"
              @style-create="addStyle()"
              @style-edit="updateStyle()"
              @style-delete="deleteStyle()"
              @close="hideModal"
            />
          </div>

          <div v-else-if="modalTitle == 'EditRestaurantName'">
            <RestaurantFormRename 
            :restaurantId="parentId"
            :restaurantNameProp="thing"
            @close="hideModal"
            @updated-restaurant-name="updateRestaurantName($event.updatedRestaurantName)"/>
          </div>
        </Modal>

      <div class="mb-auto min-h-screen">
        <!-- Restaurant name, add new category and export to JSON -->
        <div class="px-6 text-5xl font-medium md:text-right font-sans tracking-tighter capitalize subpixel-antialiased text-gray-600 sm:text-center">
          
          <div class="flex flex-row justify-end mt-4">
            <div class="self-center mb-4">
              <Button btnText="Edit" @clicked="showNewModal(restaurant.id, 'EditRestaurantName', restaurant.translations[0].name)" class="mr-4 content-center items-center self-center"/>
            </div>
            <div class="self-center">
              {{ restaurant.translations[0].name }}
            </div>
          </div>
          
          <div class="flex-inital justify-end space-x-2">
            <!-- <input class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" type="file" @change="onFileSelected">
            <button v-if="fileSelected" class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="uploadPicture">Upload Picture</button> -->

            <button class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="showNewModal(restaurant.id, 'Social', undefined)">Socials</button>
            <button class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="showNewModal(restaurant.id, 'Style', undefined)">Styles</button>
            <button class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="showNewModal(restaurant.id, 'Category', undefined)">New Category</button>
            <button class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="exportJSON(restaurant.id, restaurant.translations[0].name)">Export To JSON</button>
          </div>
        </div>

        <div class="">
          <div class="bg-white sm:p-10">
            <!-- Language selection - Dropdown menu -->
            <div class="grid justify-items-end pr-6">
              <LanguageDropdown @clicked="selectedLanguage = $event" :languages="restaurant.languages"/>
            </div>

            <!-- Category iteration -->
            <div v-for="(category, index) in restaurant.categories" v-bind:key="category.id">
              <div class="py-3 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider flex">
                <Category
                  :index="index"
                  :numberOfCategories="numberOfCategories"
                  :category="category"
                  :selectedLanguage="selectedLanguage"
                  @new="showNewModal($event.parent, $event.title, undefined)"
                  @edit="showNewModal($event.parentId, $event.title, $event.thing)"
                  @delete="alert($event)"
                  @itemEdit="showItemModal($event.parentId, $event.title, $event.thing)"
                  @refresh-categories-increment="getData()"
                  @refresh-categories-decrement="getData()"
                  @refresh-subcategories-increment="getData()"
                  @refresh-subcategories-decrement="getData()"
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
        <div class="bg-indigo-500 rounded-t-lg shadow h-28">
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
import StyleForm from './Elements/StyleForm.vue'
import SocialForm from './Elements/SocialForm.vue'
import RestaurantFormRename from './Elements/RestaurantFormRename.vue'

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
    FooterForm,
    StyleForm,
    SocialForm,
    RestaurantFormRename
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
      numberOfCategories: 0,
      fileSelected: null,
      signedUrl: ""
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
      let item = this.item;
      let returnVal = {};
      this.restaurant.languages.forEach((language) =>
        {
          returnVal[language.language_code] = item ? item.translations[this.languageIndex(item.translations, language.language_code)].description : '';
        }
      );
      return returnVal;
    },

    itemSubtitles: function() {
      let item = this.item;
      let returnVal = {};
      this.restaurant.languages.forEach((language) =>
        {
          returnVal[language.language_code] = item ? item.translations[this.languageIndex(item.translations, language.language_code)].subtitle : '';
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
          this.numberOfCategories = this.restaurant.categories.length;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // Save newly updated restaurant name
    updateRestaurantName(updateRestaurantName) {
      this.restaurant.translations[0].name = updateRestaurantName;
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
      this.item = null;
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
        .then(response => {
          this.getData();
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
    },

    // Uploading Images
    onFileSelected(event) {
      this.fileSelected = event.target.files[0];
      
      let formData = new FormData();
      formData.append("image", this.fileSelected);
      formData.append("userId", this.$service.session.user_id);
      // Make an API call 
      this.$service.API.post('/getPresignedUrl', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => response.data)
      .then(data => {
        this.signedUrl = data.presignedUrl;
      });
    },

    uploadPicture() {
      console.log(this.signedUrl);

      let formData = new FormData();
      formData.append("image", this.fileSelected);
      formData.append("url", this.signedUrl);

      this.$service.API.post('/putPicture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => response.data)
      .then(data => console.log(data));
    }
  },
}
</script>