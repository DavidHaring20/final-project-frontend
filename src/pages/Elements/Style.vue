<template>
    <tr class="border-b-2 h-12">
        <td class="text-center p-2">{{ index + 1 }}</td>

        <td class="text-center p-2">{{ styleObject.key }}</td>
        <td class="text-center p-2">{{ styleObject.value }}</td>
        
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