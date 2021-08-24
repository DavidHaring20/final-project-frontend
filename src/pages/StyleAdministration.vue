<template>
    <div>
        <h1 class="px-6 text-left text-3xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">Style Administration</h1>
        <hr class="w-4/5 mt-4 mb-2 ml-6">   
        <h2 class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4">Create and Delete Style</h2>
        <table class="ml-16 mt-16 mr-16 mb-6 w-4/5">
            <thead>
                <tr class="border-4">
                    <th class="ml-4 p-4">Number</th>
                    <th class="ml-4 p-4">header_image_max_height</th>
                    <th class="ml-4 p-4">item_title_font_family</th>
                    <th class="ml-4 p-4">item_title_display</th>
                    <th class="ml-4 p-4">item_subtitle_color</th>
                    <th class="ml-4 p-4">item_description_color</th>
                    <th class="ml-4 p-4">item_title_font_weight</th>
                    <th class="ml-4 p-4">item_subtitle_font_weight</th>
                    <th class="ml-4 p-4">item_description_font_weight</th>
                    <th class="ml-4 p-4">item_price_font_weight</th>
                    <th class="ml-4 p-4">item_title_font_size</th>
                    <th class="ml-4 p-4">item_subtitle_font_size</th>
                    <th class="ml-4 p-4">item_description_font_size</th>
                    <th class="ml-4 p-4">item_price_font_size</th>
                    <th class="ml-4 p-4">item_price_width</th>
                    <th class="ml-4 p-4">Delete</th>
                </tr>
            </thead>
            <tbody v-for="(styleObject, index) in styles" v-bind:key="styleObject.id">
                    <Style 
                    :styleObject="styleObject"
                    :index="index"
                    @delete-style="deleteStyle($event.deletedStyleId)"></Style>
            </tbody>
        </table>
        <div>
            <button class="ml-16 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="openCreateNewStyleDialog()">Create New Style</button>
        </div>

        <div v-if="emitMessage == 'Create New Style'" class="ml-16 mt-16">
            <hr class="w-2/5 mt-4 mb-2 ml-6">
            <h2 class="mt-6 mb-8 px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4">New Style</h2>

            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    headerImageMaxHeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="header_image_max_height"
                placeholder="e.g. 200px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleFontFamily
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="input"
                v-model="item_title_font_family"
                placeholder="e.g. Font Sans"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleDisplay
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="input"
                v-model="item_title_display"
                placeholder="e.g. none"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleFontWeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_title_font_weight"
                placeholder="e.g. 600"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemTitleFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_title_font_size"
                placeholder="e.g. 18px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemSubtitleColor
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_subtitle_color"
                placeholder="e.g. #E7272D"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemSubtitleFontWeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_subtitle_font_weight"
                placeholder="e.g. 600"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemSubtitleFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_subtitle_font_size"
                placeholder="e.g. 14px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemDescriptionColor
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_description_color"
                placeholder="e.g. #000000"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemDescriptionFontWeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_description_font_weight"
                placeholder="e.g. 300"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemDescriptionFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_description_font_size"
                placeholder="e.g. 14px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemPriceFontWeight
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_price_font_weight"
                placeholder="e.g. 300"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemPriceFontSize
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_price_font_size"
                placeholder="e.g. 18px"
                />
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    itemPriceWidth
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="item_price_width"
                placeholder="e.g. 70px"
                />
            </div>


            <button class="ml-16 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="saveNewStyle()">Save Changes</button>
        </div>
    </div>
</template>

<script>
import Style from './Elements/Style.vue';

export default {
    name: 'style-administration',
    path: '/style-administration',

    components: {
        Style
    },

    props: {
        index: Number
    },

    mounted() {
        this.getStyles();
    },

    data() {
        return {
            styles: Array,
            newStyle: Object,
            emitMessage: String,
            header_image_max_height: undefined, 
            item_title_font_family: undefined, 
            item_title_display: undefined, 
            item_title_font_weight: undefined, 
            item_title_font_size: undefined, 
            item_subtitle_color: undefined, 
            item_subtitle_font_weight: undefined, 
            item_subtitle_font_size: undefined, 
            item_description_color: undefined, 
            item_description_font_weight: undefined, 
            item_description_font_size: undefined,
            item_price_font_weight: undefined, 
            item_price_font_size: undefined, 
            item_price_width: undefined
        }
    },

    methods: {
        deleteStyle(id) {
            this.$service.API.delete('/styles/' + id)
            .then(response => response.data)
            .then(data => {
                console.log(data);
                // DELETE FROM ARRAY SO IT DISSAPEARS FROM THE DOM
                for (let i = 0; i < this.styles.length; i++) {
                    if (this.styles[i].id == id) {
                        this.styles.splice(i, 1);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
        },

        saveNewStyle() {
            this.$service.API.post('/styles', {
                'headerImageMaxHeight': this.header_image_max_height,
                'itemTitleFontFamily': this.item_title_font_family,
                'itemTitleDisplay': this.item_title_display,
                'itemSubtitleColor': this.item_subtitle_color, 
                'itemDescriptionColor': this.item_description_color,
                'itemTitleFontWeight': this.item_title_font_weight,
                'itemSubtitleFontWeight': this.item_subtitle_font_weight,
                'itemDescriptionFontWeight': this.item_description_font_weight,
                'itemPriceFontWeight': this.item_price_font_weight,
                'itemTitleFontSize': this.item_title_font_size,
                'itemSubtitleFontSize': this.item_subtitle_font_size,
                'itemDescriptionFontSize': this.item_description_font_size,
                'itemPriceFontSize': this.item_price_font_size,
                'itemPriceWidth': this.item_price_width
            })
            .then(response => response.data)
            .then(data => {
                // console.log(data);
                // console.log(data.data);
                // console.log(data.data.newStyle);

                // ADD TO STYLES ARRAY SO IT APPEARS IN DOM
                this.styles.push(data.data.newStyle);
            });

            this.closeCreateNewStyleDialog();
        },

        closeCreateNewStyleDialog() {
            this.emitMessage = ""
        }, 

        openCreateNewStyleDialog() {
            this.emitMessage = 'Create New Style';
        },

        getStyles() {
            this.$service.API.get('/styles')
            .then(response => response.data)
            .then(data => {
                console.log(data.data);
                this.styles = data.data.styles;
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}
</script>