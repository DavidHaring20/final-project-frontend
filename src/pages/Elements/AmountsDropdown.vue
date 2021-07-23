<template>
  <div class="relative inline-block text-right px-6">
    <div>
      <button
        type="button"
        @click="show = !show"
        class="inline-flex justify-center w-full rounded-md border border-white shadow px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true">
        <div class="capitalize text-xs">
          Amounts
        </div>
        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>

    <div
      v-if="show"
      class="origin-top-right absolute right-0 mt-2 w-15 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabindex="-1">
      <div class="py-1" role="none">
        <div
          v-for="index in amount" v-bind:key="index"
          class="text-gray-700 capitalize block px-4 py-2 text-sm text-left hover:bg-gray-50 cursor-pointer"
          role="menuitem"
          tabindex="-1"
          id="menu-item-0"
          @click="show = !show,
          selectedAmountIndex = index,
          changeSelectedAmount()">
            Amount {{ index }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmountsDropdown',
  data() {
    return {
      show: false,
      selectedAmountIndex: 1,
    }
  },

  props: {
    amounts: undefined
  },

  methods: {
    changeSelectedAmount() {
      this.$emit('clicked', this.selectedAmountIndex)
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
