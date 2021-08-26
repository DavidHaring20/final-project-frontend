<template>
  <div>
    <div v-if="restaurants">
      <Modal :width="500" :scrollable="true" height="auto" name="modal">
        <RestaurantForm
          @restaurant-create="addNewRestaurant"
          @close="hideModal"/>
      </Modal>

      <div class="justify-items-stretch">
        <div class="py-5 px-10 flex">
          List of businesses
          <Button btnText="Add" @clicked="showNewModal()" class="px-2"/>
        </div>

        <div v-for="restaurant in restaurants" :key="restaurant.id" class="px-10 py-4 flex">
          <button @click="openRestaurant(restaurant.id)" class="bg-gray-200 w-1/3 px-3 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-500">
            {{ restaurant.translations[0].name }}
          </button>
          <Button btnText="Delete" @clicked="alert(restaurant.id, 'restaurant')" class="pl-2"/>
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
      selectedLanguage: String
    }
  },

  components: {
    Button,
    RestaurantForm
  },

  mounted() {
    this.getRestaurantList();
  },

  methods: {
    getRestaurantList() {
      this.$service.API.get("/restaurants")
        .then(response => {
          this.restaurants = response.data.data.restaurants;
        })
        .catch(err => {
          console.log(err);
        });
    },

    showNewModal() {
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
  }
}
</script>
