<template>
  <div>
    <div v-if="restaurants">
      <Modal :width="500" :scrollable="true" height="auto" name="modal">
        <div v-if="modalTitle == 'NewRestaurant'">
          <RestaurantForm
            @restaurant-create="addNewRestaurant"
            @close="hideModal"/>
        </div>

        <div v-else-if="modalTitle == 'ImportJSON'">
          <div class="px-16 py-8">
            <h1 class="mb-6">Input your file here</h1>

            <input class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" type="file" @change="onFileSelected">
            <button v-if="fileSelected" class="flex-shrink-0 bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500" @click="uploadFile">Upload File</button>
          </div>
        </div>
      </Modal>

      <!-- Old look -->
      <!-- <div class="justify-items-stretch">
        <div class="py-5 px-10 flex">
          List of businesses
          <Button btnText="Add" @clicked="showNewModal('NewRestaurant')" class="px-2"/>
        </div>

        <div class="py-5 px-10 flex">
            <button @click="showNewModal('ImportJSON')" class="bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-3 rounded text-xs transition-colors duration-500">Import Restaurant From JSON File</button>
        </div>

        <div v-for="restaurant in restaurants" :key="restaurant.id" class="px-10 py-4 flex">
          <button @click="openRestaurant(restaurant.id)" class="bg-gray-200 w-1/3 px-3 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-500">
            {{ restaurant.translations[0].name }}
          </button>
          <Button btnText="Delete" @clicked="alert(restaurant.id, 'restaurant')" class="pl-2"/>
        </div>
      </div> -->

      <!-- New look -->
      <!-- Home Page whole layer -->
      <div class="w-full flex justify-center mt-32">

        <!-- Layer for reduced width -->
        <div class="w-11/12 flex flex-row ">
          
          <!-- Container for Actions -->
          <div class="w-5/12 bg-red-200 flex flex-col justify-center" style="border-right: 2px solid black;">
            <div class="flex justify-center mb-10">
              <p>Actions</p>
            </div>

            <div class="flex justify-center">
              <button class="border-2 border-green-500 w-2/5 mb-6">Create New Business</button>
            </div>

            <div class="flex justify-center">
              <button class="border-2 border-red-500 w-2/5 mb-6">Delete Business</button>
            </div>

            <div class="flex justify-center">
              <button class="border-2 border-purple-500 w-2/5 "> Import Business from JSON File</button>
            </div>
          </div>

          <!-- Container for List of Businesses -->
          <div class="w-full bg-yellow-200">
            
          </div>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
import Button from './Elements/Button.vue'
import RestaurantForm from './Elements/RestaurantForm.vue'

export default {
  path: '/home',
  name: 'Home',
  layout: require('@/layouts/Base.vue').default,

  data() {
    return {
      restaurants: undefined,
      selectedLanguage: String,
      availableLanguages: undefined,
      modalTitle: undefined,
      fileSelected: undefined
    }
  },

  components: {
    Button,
    RestaurantForm
  },

  mounted() {
    this.getLanguages();
    this.getRestaurantList();
  },

  methods: {
    log() {
      console.log("Click on Import");
    },

    getRestaurantList() {
      this.$service.API.get("/restaurants/" + this.$service.session.user_id)
        .then(response => {
          this.restaurants = response.data.data.restaurants;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getLanguages() {
      this.$service.API.get("/languages")
        .then(response => {
          this.availableLanguages = response.data.data.languages;
        })
        .catch(err => {
          console.log(err);
        });
    },

    showNewModal(title) {
      this.modalTitle = title;

      this.$modal.show('modal');
    },

    hideModal() {
      this.$modal.hide('modal');
    },

    languageIndex(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    alert(id, title) {
      this.$confirm("Are you sure?").then(() => {
        this.delete(id, title);
      });
    },

    delete(id, type) {
      this.$service.API.get("/delete/" + type + "/" + id)
        .then(response => {
          let index = this.getIndexById(id, this.restaurants);
          this.restaurants.splice(index, 1);
          if (response.data.message) {
            this.$toastr.success('Restaurant Deleted', 'Success');
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    openRestaurant(id) {
      this.$router.push({ name: 'Restaurant', params: { restaurantId: id }})
    },

    addNewRestaurant(restaurant) {
      this.restaurants.push(restaurant);
      this.createRestaurantSocial(restaurant.id);
      this.hideModal(); 
    },

    createRestaurantSocial(id) {
      this.$service.API.post('/social/' + id)
      .then(response => response.data)
      .then(data => {
        console.log(data);
      })
    },

    getIndexById(id, parent) {
      const index = parent.findIndex(item => item.id === id);
      return index;
    },

    showLanguagesModal() {
      this.$modal.show('langModal');
    },

    // Methods for Importing JSON file
    onFileSelected(event) {
      this.fileSelected = event.target.files[0];
      
      console.log(this.fileSelected);
      console.log(this.$service.session.user_id);
    },

    uploadFile() {
      let formData = new FormData();
      formData.append("file", this.fileSelected);
      formData.append("userID", this.$service.session.user_id);

      // API call
      this.$service.API.post('/import-json', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.data)
      .then(data => {
        console.log(data);
        if (data.errorMessage) {
          this.$toastr.error(data.errorMessage, 'Error');
        } else {
          this.addNewRestaurant(data.newRestaurant);
          this.$toastr.success(data.message, 'Success');
        }
      })
    }
  }
}
</script>
