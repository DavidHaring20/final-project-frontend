<template>
    <div>
        <table class="ml-16 mt-16 mr-16 mb-6 w-4/5">
            <thead>
                <tr class="border-4">
                    <th class="ml-4 p-4">Index</th>
                    <th class="ml-4 p-4">User Email</th>
                    <th class="ml-4 p-4">Restaurant Name</th>
                    <th class="ml-4 p-4">Restaurant Slug</th>
                    <th class="ml-4 p-4">EDIT</th>
                </tr>
            </thead>
            <tbody v-for="(dataObject, index) in dataObjects" :key="dataObject.index">
                <IdOrSlug
                    :index="index"
                    :dataObject="dataObject"
                    @emit-update="emitUpdate($event.oldSlug)"
                />
            </tbody>
        </table>
    </div>
</template>

<script>
import IdOrSlug from './IdOrSlug.vue';
export default {
    name: 'IdOrSlugTable',

    props: {
        slugToDom: String
    },

    data() {
        return {
            dataObjects: [],
            oldSlugValue: ""
        }
    }, 

    components: {
        IdOrSlug
    },

    mounted() {
        this.getDataForEditingSlugs();
    },

    watch: {
        slugToDom(newValue) {
            console.log(this.oldSlugValue);
            for (let i = 0; i < this.dataObjects.length; i++) {
                console.log(this.dataObjects[i].slug);
                if (this.dataObjects[i].slug === this.oldSlugValue) {
                    this.dataObjects[i].slug = newValue;
                }
            }
        }
    },

    methods: {
        getDataForEditingSlugs() {
            this.$service.API.get('restaurantsInfoForEditingSlug')
            .then(response => response.data)
            .then(data => {                
                console.log(data);
                this.dataObjects = data.dataObjects;
            })
            .catch(error => {
                console.log("Error: " + error);
            })

            
        },

        emitUpdate(oldSlug) {
            this.oldSlugValue = oldSlug;
            this.$emit('emit-update', {'oldSlug': oldSlug});
        }
    }
}
</script>