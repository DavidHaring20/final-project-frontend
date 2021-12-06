<template>
  <div class="header-2 bg-black h-10">
      <nav class="py-1 md:py-1">
        <div class="container px-4 mx-auto md:flex md:items-center">
          <div class="flex justify-between">
            <button @click="goToHome()" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <div class="px-4 font-bold text-xl text-white font-mono">
                PocketMenu
              </div>
            </button>
            <button class="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
              <i class="fas fa-bars"></i>
            </button>
          </div>


          <div class="flex  w-screen justify-self-end">
            <div class="w-full flex justify-center ml-72">
              <div v-if="userRole == 'admin'" style="border-color: black white white black; transform: rotate(45deg)" class="w-5 h-5 border-4"></div>
            </div>

            <div class="w-full flex justify-end">
              <a href="/" class="px-8 text-sm text-white text-center border border-transparent rounded hover:bg-white hover:text-black transition-colors duration-300">Log Out</a>
            </div>
            
          </div>

          <div v-if="clicked == true">
              <button @click="goToLanguageAdministration()" class="p-1 text-xs lg:px-2 md:mx-2 text-gray-600 text-center border border-transparent rounded hover:bg-gray-300 hover:text-white transition-colors duration-300">Language Administration</button>
              <button @click="goToStyleAdministration()" class="p-1 text-xs lg:px-2 md:mx-2 text-gray-600 text-center border border-transparent rounded hover:bg-gray-300 hover:text-white transition-colors duration-300">Style Administration</button>
              <button @click="goToSlugOrIdAdministration()" class="p-1 text-xs lg:px-2 md:mx-2 text-gray-600 text-center border border-transparent rounded hover:bg-gray-300 hover:text-white transition-colors duration-300">Slug/ID Administration</button>
            </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'Navbar',

  data () {
    return {
      userRole: ""
    }
  },

    mounted() {
      this.userRole = this.$service.session.user_role;
    },

  methods: {
    goToLanguageAdministration() {
      this.$router.push({ name: 'language-administration'});
    },

    goToStyleAdministration() {
      this.$router.push({ name: 'style-administration'});
    },

    goToSlugOrIdAdministration() {
      this.$router.push({ name: 'id-or-slug-administration' });
    },

    goToHome() {
      this.$router.push({ name: 'Home'});
    }
  }
}
</script>
