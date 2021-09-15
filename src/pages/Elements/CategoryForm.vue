<template>
  <div class="px-10 py-10">
     <div v-if="translations['hr']" class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      Edit Category: {{ translations["hr"] }}
    </div>
    <div v-else class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      New Category
    </div>

    <div  class="px-6 py-4 flex-1">
      <TranslationInput v-for="language in languages" :languageCode="language.language_code" :key="language.language_code" :translations.sync="translations" class="mb-4 flex-row" />
        <div class="px-6 flex flex-wrap justify-end">
          <div v-if="translations['hr']" class="p-1.5">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="updateCategory()">Update</button>
          </div>
          <div v-else class="p-1.5">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="createNewCategory()">Save</button>
          </div>
          <div class="p-1.5">
            <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded transition-colors duration-300" @click="$emit('close')">Cancel</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TranslationInput from '../../components/TranslationInput.vue'

export default {
  name: 'CategoryForm',
  props: {
    title: String,
    parent: undefined,
    languages: undefined,
    translations: undefined
  },

  components: {
    TranslationInput
  },

  data() {
    return {
      translationsMutable: {},
    }
  },

  mounted() {
    this.translationsMutable = this.translations;
  },

  methods: {
    createNewCategory() {
      let self = this;

      this.$service.API.post('/restaurant/' + this.parent + '/category', {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        self.$nextTick(() => {
          self.$emit('category-create', response.data.data.category);
        });
      })
      .then(response => {
        this.$emit('refesh-by-new-category');
      });
    },

    updateCategory() {
      let self = this;

      this.$service.API.post('/category/update/' + this.parent, {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
          self.$nextTick(() => {
            self.$emit('category-update', response.data.data.category);
          });
        }, response => {
        console.log(response);
      });
    },
  }
}
</script>
