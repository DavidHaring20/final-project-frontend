<template>
    <div class="px-10 py-10">
        <div class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">Styles</div>
    
        <div v-for="style in styles" v-bind:key="style.id">
            
            <div class="flex flew-row">
                <div 
                    class="cursor-pointer hover:bg-gray-300 px-6 rounded-lg border-2 border-gray-300 my-8 p-4 grid grid-flow-col grid-cols-2 grid-rows-2 gap-5 w-4/5" 
                    @click="selectStyle(style.id)"
                    :style="style.id == styleID ? 'border-color: blue; border-width: 3px': ''"
                >
                    <div :style="{fontFamily: style.item_title_font_family, display: style.item_title_display, fontWeight: style.item_title_font_weight, fontSize: style.item_title_font_size}"><span>Item Title</span></div>
                    <div :style="{color: style.item_subtitle_color, fontWeight: style.item_subtitle_font_weight, fontSize: style.item_subtitle_font_size}"><span>Item Subtitle</span></div>
                    <div :style="{color: style.item_description_color, fontWeight: style.item_description_font_weight, fontSize: style.item_description_font_size}"><span>Item Description</span></div>
                    <div :style="{fontWeight: style.item_price_font_weight, fontSize: style.item_price_font_size, width: style.item_price_width}">Price</div>
                </div>
                <div class="flex justify-center items-center w-1/6">
                    <Button @clicked="editStyle(style.id, style)" btnText="Edit"/>
                </div>
            </div> 
        </div>

        <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="confirmSelectedStyle()">Choose Style</button>

        <div class="border-b-2 mt-6"></div>

        <div v-if="modalTitle == 'editStyle'">
            <div class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4">Edit Style</div>

            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    headerImageMaxHeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.header_image_max_height"
                placeholder="e.g. 200px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleFontFamily
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_title_font_family"
                placeholder="e.g. Font Sans"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleDisplay
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_title_display"
                placeholder="e.g. none"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleFontWeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_title_font_weight"
                placeholder="e.g. 600"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_title_font_size"
                placeholder="e.g. 18px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemSubtitleColor
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_subtitle_color"
                placeholder="e.g. #E7272D"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemSubtitleFontWeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_subtitle_font_weight"
                placeholder="e.g. 600"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemSubtitleFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_subtitle_font_size"
                placeholder="e.g. 14px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemDescriptionColor
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_description_color"
                placeholder="e.g. #000000"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemDescriptionFontWeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_description_font_weight"
                placeholder="e.g. 300"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemDescriptionFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_description_font_size"
                placeholder="e.g. 14px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 uppercase" for="input">
                    Price Font Weight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_price_font_weight"
                placeholder="e.g. 300"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemPriceFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_price_font_size"
                placeholder="e.g. 18px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemPriceWidth
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="input"
                v-model="editedStyle.item_price_width"
                placeholder="e.g. 70px"
                />
            </div>

            <button class="bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="confirmEditedStyle()">Save Changes</button>
        </div>

    </div>
</template>

<script>
import Button from './Button.vue';

export default {
    name: 'StyleForm',

    components: {
        Button
    },

    data() { 
        return{
            styles: undefined,
            styleID: undefined,
            modalTitle: String,
            editedStyle: Object
        }
    },
    
    mounted() {
        this.getStyles();
    },

    methods: {
        editStyle(id, style) {
            this.modalTitle = 'editStyle';
            this.editedStyle = style;
        },

        confirmEditedStyle() {
            // console.log(this.editedStyle);

            this.$service.API.patch('/styles/' + this.editedStyle.id, {
                headerImageMaxHeight: this.editedStyle.header_image_max_height,
                itemTitleFontFamily: this.editedStyle.item_title_font_family,
                itemTitleDisplay: this.editedStyle.item_title_display,
                itemSubtitleColor: this.editedStyle.item_subtitle_color,
                itemDescriptionColor: this.editedStyle.item_description_color,
                itemTitleFontWeight: this.editedStyle.item_title_font_weight,
                itemSubtitleFontWeight: this.editedStyle.item_subtitle_font_weight,
                itemDescriptionFontWeight: this.editedStyle.item_description_font_weight,
                itemPriceFontWeight: this.editedStyle.item_price_font_weight,
                itemTitleFontSize: this.editedStyle.item_title_font_size,
                itemSubtitleFontSize: this.editedStyle.item_subtitle_font_size,
                itemDescriptionFontSize: this.editedStyle.item_description_font_size,
                itemPriceFontSize: this.editedStyle.item_price_font_size,
                itemPriceWidth: this.editedStyle.item_price_width
            })
            .then(response => response.data)
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

            this.modalTitle = '';
        },

        confirmSelectedStyle() {
            let self = this;

            this.$service.API.get('/styles/' + this.styleID)
            .then(response => response.data)
            .then(data => {
                self.$nextTick(() => {
                    self.$emit('style-select', {styleId: data.data.style.id});
                    this.hideModal();
                });
            })
        },

        selectStyle(id) {
            this.styleID = id;
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