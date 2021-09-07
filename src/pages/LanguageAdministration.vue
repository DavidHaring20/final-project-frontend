<template>
    <div>
        <h1>Language Administration</h1>

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