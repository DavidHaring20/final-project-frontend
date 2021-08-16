<template>
    <div class="px-10 py-10">
        <div class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">Styles</div>
      
        <div v-for="style in styles" v-bind:key="style.id">
            <div class="px-6 flex flew-row rounded-lg border-2 border-gray-300 my-8 p-4">
                <div v-bind:class="[style.item_title_font_family, style.item_title_display, style.item_title_font_weight, style.item_title_font_size, space]"><span>Item Title</span></div>
                <div v-bind:class="[style.item_subtitle_color, style.item_subtitle_font_weight, style.item_subtitle_font_size, space]"><span>Item Subtitle</span></div>
                <div v-bind:class="[style.item_description_color, style.item_description_font_weight, style.item_description_font_size, space]"><span>Item Description</span></div>
                <div v-bind:class="[style.item_price_font_weight, style.item_price_font_size, style.item_price_width, space]">Price</div>
            </div>
        </div>
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

    props: {
        headerImageMaxHeight: undefined,
        itemTitleFontFamily: undefined,
        itemTitleDisplay: undefined,
        itemSubtitleColor: undefined,
        itemDescriptionColor: 'text-red-400',
        itemTitleFontWeight: undefined,
        itemSubtitleFontWeight: undefined,
        itemDescriptionFontWeight: undefined,
        itemPriceFontWeight: undefined,
        itemTitleFontSize: "text-5xl",
        itemSubtitleFontSize: undefined,
        itemDescriptionFontSize: undefined,
        itemPriceFontSize: undefined,
        itemPriceWidth: undefined,
        restaurantID: undefined
    },
    
    mounted() {
        this.getStyles();
    },

    methods: {
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