<template>
    <tr class="border-b-2">
        <td class="text-center p-2">{{ index + 1 }}</td>
        <td class="text-center p-2">{{ styleObject.header_image_max_height }}</td>
        <td class="text-center p-2">{{ styleObject.item_title_font_family }}</td>
        <td class="text-center p-2">{{ styleObject.item_title_display }}</td>
        <td class="text-center p-2">{{ styleObject.item_subtitle_color }}</td>
        <td class="text-center p-2">{{ styleObject.item_description_color }}</td>
        <td class="text-center p-2">{{ styleObject.item_title_font_weight }}</td>
        <td class="text-center p-2">{{ styleObject.item_subtitle_font_weight }}</td>
        <td class="text-center p-2">{{ styleObject.item_description_font_weight }}</td>
        <td class="text-center p-2">{{ styleObject.item_price_font_weight }}</td>
        <td class="text-center p-2">{{ styleObject.item_title_font_size }}</td>
        <td class="text-center p-2">{{ styleObject.item_subtitle_font_size }}</td>
        <td class="text-center p-2">{{ styleObject.item_description_font_size }}</td>
        <td class="text-center p-2">{{ styleObject.item_price_font_size }}</td>
        <td class="text-center p-2">{{ styleObject.item_price_width }}</td>
        <td class="text-center p-2" @click="emitDelete(styleObject.id)"><Button btnText="Delete" class="text-center"/></td>
    </tr>
</template>

<script>
import Button from './Button.vue'
export default {
    name: 'Style',

    components: {
        Button
    },
    
    props: {
        index: Number,
        styleObject: Object
    },

    methods:  {
        emitDelete(id) {
            console.log(id);
            this.$emit('delete-style', { deletedStyleId: id});
        }
    }
}
</script>