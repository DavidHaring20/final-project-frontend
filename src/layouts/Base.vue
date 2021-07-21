<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<script>
import Navbar from '../pages/Elements/Navbar.vue'

export default {
  name:'Base',
  components: {
    Navbar
  }
}
</script>
