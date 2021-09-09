<template>
    <div>
        <Modal :width="500" :scrollable="true" height="auto" name="modal">
            <IdOrSlugForm
                :slug="slug"
                @close="hideModal"
                @addUpdatedSlug="passUpdatedSlug($event.updatedSlug)"
            />
        </Modal>

        <h1 class="px-6 text-left text-3xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">Slug or ID Administration</h1>
        <hr class="w-4/5 mt-4 mb-2 ml-6"> 
        <h2 class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4">Slug/ID Table</h2>

        <IdOrSlugTable
            :slugToDom="slugToDom"
            @emit-update="setUpdateValue($event.oldSlug)"
        />
    </div>
</template>

<script>
import IdOrSlugTable from './Elements/IdOrSlugTable.vue';
import IdOrSlugForm from './Elements/IdOrSlugForm.vue';

export default {
    name: 'id-or-slug-administration',
    path: '/idOrSlugAdministration',
    layout: require('@/layouts/Base.vue').default,

    components: {
        IdOrSlugTable,
        IdOrSlugForm
    },

    data() {
        return {
            slug: "",
            slugToDom: ""
        }
    },

    methods: {
        showNewModal () {
            this.$modal.show('modal');
        },

        hideModal() {
            this.$modal.hide('modal');
        },

        setUpdateValue(oldSlug) {
            this.slug = oldSlug;
            this.showNewModal();
        },

        passUpdatedSlug(updatedSlug) {
            this.slugToDom = updatedSlug;
        }
    }
}
</script>