<template>
  <div class="px-10 py-10">
    <!-- TITLE -->
    <div class="px-6 text-left text-4xl capitalize font-medium text-gray-500 uppercase tracking-wider">
      {{ parent.translations[0].name }}
    </div>
    <div v-if="toEdit != null" class="px-6 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
      Edit {{ title }}
    </div>
    <div v-else class="px-6 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">
      New {{ title }}
    </div>

    <!-- CATEGORIES & SUBCATEGORIES  -->
    <div v-if="title == 'Subcategory' || title == 'Category'" class="flex-1">
      <div  class="px-6 py-4">
        <div v-for="translation in parent.translations" v-bind:key="translation.id" class="mb-4 flex-row">
          <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
            {{translation.language_code}}
          </label>
          <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="input"
            v-model="translations[translation.language_code]"
            placeholder="Title" />
        </div>

          <div class="px-6 flex flex-wrap justify-end">
            <div v-if="toEdit" class="p-1.5">
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="title == 'Subcategory' ? updateSubcategory() : updateCategory()">Update</button>
            </div>
            <div v-else class="p-1.5">
              <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded" @click="title == 'Subcategory' ? createNewSubcategory() : createNewCategory()">Save</button>
            </div>
            <div class="p-1.5">
              <button class="bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 text-xs px-4 rounded" @click="close()">Cancel</button>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: String,
    parent: undefined,
    languages: undefined,
    toEdit: {
      type: undefined,
      default: null
    },
  },

  data() {
    return {
      translations: this.toEdit ? Object.keys(this.toEdit).map(key => ({[this.toEdit[key].language_code] : this.toEdit[key].name})).reduce(function(result, item) {
        var key = Object.keys(item)[0];
        result[key] = item[key];
        return result;
      }, {}) : {},
    }
  },

  methods: {
    //CATEGORY
    createNewCategory() {
      let self = this;

      this.$service.API.post('/restaurant/' + this.parent.id + '/category', {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        self.$nextTick(() => {
          self.$emit('category-create', response.data.data.category);
        });
      }, response => {
        console.log(response);
      });
    },

    updateCategory() {
      let self = this;

      this.$service.API.post('/category/update/' + this.parent.id, {
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

    //SUBCATEGORY
    createNewSubcategory() {
      let self = this;

      this.$service.API.post('/category/' + this.parent.id + '/subcategory', {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        self.$nextTick(() => {
          self.$emit('subcategory-create', response.data.data.subcategory);
        });
      }, response => {
        console.log(response);
      });
    },

    updateSubcategory() {
      let self = this;

      this.$service.API.post('/subcategory/update/' + this.parent.id, {
        translations: JSON.stringify(this.translations),
      })
      .then(response => {
        self.$nextTick(() => {
          self.$emit('subcategory-update', response.data.data.subcategory);
        });
      }, response => {
        console.log(response);
      });
    },
  },
}
</script>
