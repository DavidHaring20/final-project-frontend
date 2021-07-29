<template>
  <div>
    <!-- <Navbar /> -->
    <div v-if="restaurants">
      <!-- <LanguageDropdown :languages="restaurants[0].languages" @clicked="selectedLanguage=$event" class="px-2 py-2"/> -->
      <div class="justify-items-stretch">
        <div class="py-5 px-10">
          Popis uslužnih djelatnosti:
        </div>

        <div v-for="restaurant in restaurants" :key="restaurant.id" class="px-10 flex">
          <button @click="openRestaurant(restaurant.id)" class="bg-gray-200 px-60 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-300">
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

export default {
  path: '/home',
  layout: require('@/layouts/Base.vue').default,

  data() {
    return {
      restaurants: undefined,
      selectedLanguage: String
    }
  },

  components: {
    // LanguageDropdown,
    Button
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
      this.$service.API.get("/" + type + "/" + id)
        .then(response => {
        })
        .catch(err => {
          console.log(err);
        });
    },

    openRestaurant(id) {
      this.$router.push({ name: 'Restaurant', params: { restaurantId: id }})
    }
  }
}
</script>
