<template>
    <div class="px-16 py-8">
        <h1 class="pb-6 pt-5 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">Edit Slug</h1>

        <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    Slug
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="input"
                    v-model="slugModel"
                    placeholder="restaurant-example"
                />
            </div>

        <button class="ml-16 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="updateSlug()">Save Change</button>
    </div>
</template>

<script>
export default {
    name: 'RestaurantForm',

    props: {
        slug: String
    },

    mounted() {
        this.slugModel = this.slug;
        this.oldSlug = this.slug;
    },

    data() {
        return {
            slugModel: "",
            newSlug: ""
        }
    },

    methods: {
        updateSlug() {
            this.$service.API.patch('/editSlug/' + this.oldSlug, {
                slug: this.slugModel
            })
            .then(response => response.data)
            .then(data => {
                if (data.updatedSlug) {
                    this.newSlug = data.updatedSlug;
                }
                this.$emit('addUpdatedSlug', {'updatedSlug': this.newSlug });
                this.$emit('close');
            })
            .catch(error => {
                console.log('Error: ' + error);
            });
        }
    }
}
</script>