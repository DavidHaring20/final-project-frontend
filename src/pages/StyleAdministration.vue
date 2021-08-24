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
                    :index="index"></Style>
            </tbody>
        </table>
        <div>
            <button class="ml-16 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300">Create New Style</button>
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
            styles: Array
        }
    },

    methods: {
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