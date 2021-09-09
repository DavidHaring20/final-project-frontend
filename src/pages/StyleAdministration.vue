<template>
    <div>
        <h1 class="px-6 text-left text-3xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">Style Administration</h1>
        <hr class="w-4/5 mt-4 mb-2 ml-6">   
        <h2 class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4">Create and Delete Style</h2>
        <table class="ml-16 mt-16 mr-16 mb-6 w-4/5">
            <thead>
                <tr class="border-4">
                    <th class="ml-4 p-4">Number</th>
                    <th class="ml-4 p-4">Key</th>
                    <th class="ml-4 p-4">Value</th>
                    <th class="ml-4 p-4">Delete</th>
                </tr>
            </thead>
            <tbody v-for="(styleObject, index) in styles" v-bind:key="styleObject.id">
                    <Style 
                    :styleObject="styleObject"
                    :index="index"
                    @delete-style="alert($event.deletedStyleId)"></Style>
            </tbody>
        </table>

        <div v-if="emitMessage == ''">
            <div class="h-72">
                <button class="ml-16 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="openCreateNewStyleDialog()">Create New Style</button>
            </div>
        </div>

        <div v-if="emitMessage == 'Create New Style'" class="ml-16 mt-16">
            <hr class="w-2/5 mt-4 mb-2 ml-6">
            <h2 class="mt-6 mb-8 px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4">New Style Property</h2>

            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    Key
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="key"
                placeholder="e.g. itemPriceWidth"
                />
            </div>
            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    Value
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="value"
                placeholder="e.g. 200px, #000000"
                />
            </div>

            <div class="h-72">
                <button class="ml-16 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="saveNewStyle()">Add Style</button>
            </div>
        </div>
    </div>
</template>

<script>
import Style from './Elements/Style.vue';

export default {
    name: 'style-administration',
    path: '/style-administration',
    layout: require('@/layouts/Base.vue').default,

    components: {
        Style
    },

    props: {
        index: Number
    },

    mounted() {
        this.getStyles();
    },

    data() {
        return {
            styles: Array,
            newStyle: Object,
            emitMessage: "",
            key: "",
            value: ""
        }
    },

    methods: {
        setToNull() {
            this.key = "";
            this.value =  "";
        },

        deleteStyle(id) {
            this.$service.API.delete('/styleMaster/' + id)
            .then(response => response.data)
            .then(data => {
                console.log(data);
                // DELETE FROM ARRAY SO IT DISSAPEARS FROM THE DOM
                for (let i = 0; i < this.styles.length; i++) {
                    if (this.styles[i].id == id) {
                        this.styles.splice(i, 1);
                        this.$toastr.success('Style Deleted', 'Success');
                    }
                }
            })
            .catch(error => {
                console.log(error);
            });
        },

        saveNewStyle() {
            this.$service.API.post('/styleMaster', {
                key: this.key,
                value: this.value
            })
            .then(response => response.data)
            .then(data => {
                console.log(data);

                // ADD TO STYLES ARRAY SO IT APPEARS IN DOM
                if (data.newStyleMasterProperty) {
                    this.styles.push(data.newStyleMasterProperty);
                    this.$toastr.success('Style Added', 'Success');
                } else if (data.errorMessage) {
                    for (let key in data.errorMessage) {
                        this.$toastr.error(data.errorMessage[key][0], 'Warning');
                    }
                }
            });

            this.closeCreateNewStyleDialog();
            this.setToNull();
        },

        closeCreateNewStyleDialog() {
            this.emitMessage = ""
        }, 

        openCreateNewStyleDialog() {
            this.emitMessage = 'Create New Style';
        },

        getStyles() {
            this.$service.API.get('/styleMaster')
            .then(response => response.data)
            .then(data => {
                console.log(data);
                this.styles = data.styleMaster;
            })
            .catch(error => {
                console.log(error);
            });
        },

        alert(id) {
            this.$confirm("Are you sure?").then(() => {
                this.deleteStyle(id);
            });
        }
    }
}
</script>