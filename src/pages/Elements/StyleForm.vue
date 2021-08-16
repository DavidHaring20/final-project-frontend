<template>
    <div class="px-10 py-10">
        <div class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">Styles</div>
      
        <div v-for="style in styles" v-bind:key="style.id">
            <div class="px-6 flex flew-row rounded-lg border-2 border-gray-300 my-8 p-4" @click="selectStyle(style.id)">
                <div v-bind:class="[style.item_title_font_family, style.item_title_display, style.item_title_font_weight, style.item_title_font_size, space]"><span>Item Title</span></div>
                <div v-bind:class="[style.item_subtitle_color, style.item_subtitle_font_weight, style.item_subtitle_font_size, space]"><span>Item Subtitle</span></div>
                <div v-bind:class="[style.item_description_color, style.item_description_font_weight, style.item_description_font_size, space]"><span>Item Description</span></div>
                <div v-bind:class="[style.item_price_font_weight, style.item_price_font_size, style.item_price_width, space]">Price</div>
            </div>
        </div>

        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="hideModal()">Choose Style</button>
    </div>
</template>

<script>
export default {
    name: 'StyleForm',

    data() { 
        return{
            styles: undefined,
            space: 'w-full'
        }
    },
    
    mounted() {
        this.getStyles();
    },

    methods: {
        selectStyle(id) {
            let self = this;

            this.$service.API.get('/styles/show/' + id)
            .then(response => response.data)
            .then(data => {
                self.$nextTick(() => {
                    self.$emit('style-select', {style: data.data.style});
                });
                console.log(data.data.style);
            })
        },

        hideModal() {
            this.$modal.hide('modal');
        },

        getStyles() {
            this.$service.API.get('/styles')
            .then(response => response.data)
            .then(data => {
                console.dir(data.data.styles);
                this.styles = data.data.styles;
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    
}
</script>