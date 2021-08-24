<template>
  <div class="header-2 bg-gray-100 shadow rounded-b-lg">
      <nav class="py-1 md:py-1">
        <div class="container px-4 mx-auto md:flex md:items-center">
          <div class="flex justify-between">
            <a href="/home" class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              <div class="px-2 font-bold text-gray-500 font-mono">
                PocketMenu
              </div>
            </a>
            <button class="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
              <i class="fas fa-bars"></i>
            </button>
          </div>

          <div class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
            <button @click="goToStyle()" class="p-1 text-xs lg:px-2 md:mx-2 text-gray-600 text-center border border-transparent rounded hover:bg-gray-300 hover:text-white transition-colors duration-300">Style Administration</button>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  name: 'Navbar',

  methods: {
    goToStyle() {
      this.$router.push({ name: 'style-administration'})
    }
  }
}
</script>
