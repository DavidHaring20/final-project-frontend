<template>
  <div class="flex flex-col">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <div class="bg-gray-50 flex py-3 flex-row">
          <div class="w-3/5 px-6 text-left uppercase tracking-wider text-xs font-medium text-gray-700">Item</div>
          <div class="w-full max-w-full px-6 text-left uppercase tracking-wider text-xs font-medium text-gray-700">Subtitle</div>
          <div class="w-full max-w-full px-6 text-left uppercase tracking-wider text-xs font-medium text-gray-700">Description</div>
          <div class="w-2/4 px-6 text-left uppercase tracking-wider text-xs font-medium text-gray-700">Amount</div>
          <div class="w-2/4 px-6 text-left uppercase tracking-wider text-xs font-medium text-gray-700">Price</div>
          <div class="w-1/4 px-6 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Edit</div>
          <div class="w-1/4 px-6 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">Delete</div>
        </div>
          <draggable v-model="itemArray" @end="checkEnd">
            <div v-for="item in itemArray" :key="item.id" class="min-h-12 bg-white divide-y divide-gray-200"> 
              <Item
                :item="item"
                :selectedLanguage="selectedLanguage"
                @edit="emitEdit($event.parent, $event.title, $event.thing)"
                @delete="emitDelete($event.id, $event.title)"
              />
            </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import Item from './Item.vue'

export default {
  name: 'ItemsTable',
  props: {
    styleObject: Object,
    items: Array,
    selectedLanguage: String
  },

  components: {
    Item,
    draggable
  },

  data() {
    return {
      itemArray: []
    }
  },

  mounted() {
    this.itemArray = this.items;
  },
  
  methods: {
    lang(translations) {
      const index = translations.findIndex(item => item.language_code === this.selectedLanguage);
      return index;
    },

    emitEdit(parent, title, thing) {
      this.$emit('edit', {parent, title, thing});
    },

    emitDelete(id, title) {
      this.$emit('delete', {id, title})
    },

    checkEnd(evt) {
      console.log(evt);

      // this.positionsArray = this.itemsArray.map(item => item.position);
      // this.idsArray = this.itemsArray.map(item => item.id);
      
      // this.updateOrder(this.itemsArray[evt.newIndex].id);
    },

    updateOrder(id) {
      this.$service.API.patch('/SortDragAndDrop', {
        idArray: this.idsArray,
        positionArray: this.positionsArray,
        itemId: id
      })
      .then(response => response.data)
      .then(data => {
        console.log(data);
      });
    }
  }
}
</script>
