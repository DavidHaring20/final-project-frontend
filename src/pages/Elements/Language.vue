<template>
    <tr class="h-12 border-b-2">
        <td class="text-center p-2">
            {{ index + 1 }}
        </td>
        <td class="text-center p-2">
            {{ language.language_code }}
        </td>
            <td class="text-center p-2">
            {{ language.language_name }}
        </td>
        <td class="text-center p-2">
            <Button btnText="Edit" @clicked="emitUpdate(language)"/>
        </td>
        <td class="text-center p-2">
            <Button btnText="Delete" @clicked="deleteAlert(language.language_code)"/>
        </td>
    </tr>
</template>

<script>
import Button from './Button.vue'

export default {
    name: 'Language',

    props: {
        index: Number,
        language: undefined
    },

    components: {
        Button
    },

    methods: {
        deleteAlert(code) {
            this.$confirm("Are you sure?").then(() => {
                this.deleteLanguage(code);
            });
        },

        deleteLanguage(code) {
             this.$service.API.delete("/languages/" + code)
            .then(response => {
                this.$emit('deletedLanguage', {'deleted' : response.data.deletedLanguage});
            })
            .catch(err => {
                console.log(err);
            });
        },

        emitUpdate(language) {
            this.$emit('update-language', { 'updateLanguage': language });
        }   
    }
}
</script>