<template>
  <div>
    <div v-if="btnText == 'Delete'">
      <button class="bg-violet-300 hover:bg-violet-500 text-s px-1 py-1 rounded-full text-white items-center justify-center transition-colors duration-500" @click="click()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>

    <div v-else>
        <button class="bg-gray-300 hover:bg-gray-500 text-s px-1 py-1 rounded-full text-white transition-colors duration-500" @click="click()">
          <div v-if="btnText == 'Edit'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </div>

          <div v-else-if="btnText == 'Add'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>

          <div v-else-if="btnText == 'Picture'">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div v-else class="leading-tight px-2">
            {{ btnText }}
          </div>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
      btnText: String,
  },

  methods: {
    openDialog() {
      this.isVisible = true;
    },

    click() {
      this.$emit('clicked');
    }
  }
}
</script>
