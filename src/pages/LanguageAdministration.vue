<template>
    <div>
        <h1 class="px-6 text-left text-3xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">Language Administration</h1>

        <hr class="w-4/5 mt-4 mb-2 ml-6"> 

        <LanguageTable/>
    </div>
</template>

<script>
import LanguageTable from './Elements/LanguageTable.vue'

export default {
    name: 'language-administration',
    path: '/languageAdministration',
    layout: require('@/layouts/Base.vue').default,

    components: {
        LanguageTable
    }
}
</script>