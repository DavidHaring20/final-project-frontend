<template>
    <tr class="border-b-2 h-12">
        <td class="text-center p-2">       
            {{ index + 1 }}
        </td>
        <td class="text-center p-2">
            {{ dataObject.username }}
        </td>
        <td class="text-center p-2">
            {{ dataObject.restaurantName }}
        </td>
        <td class="text-center p-2 font-bold">
            {{ dataObject.slug }}
        </td>
        <td class="text-center p-2" @click="emitUpdate(dataObject.slug)">
            <Button btnText='Edit' class="text-center"/>
        </td>
    </tr>
</template>

<script>
import Button from './Button.vue';
export default {
    name: 'IdOrSlug',
    
    props: {
        index: Number,
        dataObject: Object
    },

    components: {
        Button
    },

    methods: {
        emitUpdate(oldSlug) {
            this.$emit('emit-update', {'oldSlug': oldSlug});
        }
    }
}
</script>