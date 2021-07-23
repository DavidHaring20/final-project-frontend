<template>
  <div>
    <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
      {{ language.language_code }}
    </label>
    <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      type="text"
      name="input"
      v-model="translation"
      placeholder="Title"
    />
  </div>
</template>

<script>

export default {
  name: "TranslationInput",

  props: {
    translations: {
      default: undefined,
      typeof: Object,
      require: true,
    },
    language: {
      default: undefined,
      typeof: Object,
      require: true,
    }
  },

  data: function() {
    return {
      translation: undefined
    }
  },

  computed: {
    translationsMutable: {
      get() {
        return this.translations;
      },
      set(val) {
        this.$emit('update:translations', val);
      },
    },
  },

  mounted() {
    this.translation = this.translations[this.language.language_code];
  },

  watch: {
    translation: {
      handler: function(oldVal, newVal) {
        console.log('WATCH ME');
        if(oldVal != newVal) {
          this.$set(this.translationsMutable, this.language.language_code, this.translation);
        }
      }
    }
  }
}
</script>
