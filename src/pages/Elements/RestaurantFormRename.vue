<template>
    <div class="px-10 py-10">
        <div class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">
            New Category
        </div>

        <hr class="w-4/5 mt-6 mb-6 ml-6">

        <div class="px-6">
            <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="input"
                v-model="restaurantName"
            />
        </div>

        <button id="save-change-button" class="ml-6 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="updateRestaurantName">Save Changes</button>
    </div>
</template>

<script>
export default {
    name: 'RestaurantRenameForm',
  
    mounted() {
        this.restaurantName = this.restaurantNameProp;
    },

    props: {
        restaurantId: Number,
        restaurantNameProp: String
    },
    
    data() { 
        return {
            restaurantName: ""
        }
    },

    methods: {
        updateRestaurantName() {
            console.log(this.restaurantName);
            console.log(this.restaurantId);
            this.$service.API.patch('/editRestaurantName/' + this.restaurantId, {
                updatedRestaurantName: this.restaurantName
            })
            .then(response => response.data)
            .then(data => { 
                console.log(data);
                this.$emit('updated-restaurant-name', { 'updatedRestaurantName': this.restaurantName });
                this.$emit('close');
            });
        }
    }

}
</script>