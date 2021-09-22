<template>
    <div class="px-10 py-10">
        <div class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">Style</div>
    
        <div class="border-b-2 mt-6"></div>

        <div v-for="style in styles" :key="style.id">
             <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    {{ style.key }}
                </label>
                
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="input"
                    v-model="style.value"
                />
            </div>           
        </div>

        <div v-if="loadingMode == 'on'">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle-notch" 
            class="svg-inline--fa fa-circle-notch fa-w-16 w-1/12 mt-8 ml-48 animate-spin" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgb(55, 65, 81)" d="M288 39.056v16.659c0 10.804 7.281 20.159 17.686 23.066C383.204 100.434 440 171.518 440 256c0 101.689-82.295 184-184 184-101.689 0-184-82.295-184-184 0-84.47 56.786-155.564 134.312-177.219C216.719 75.874 224 66.517 224 55.712V39.064c0-15.709-14.834-27.153-30.046-23.234C86.603 43.482 7.394 141.206 8.003 257.332c.72 137.052 111.477 246.956 248.531 246.667C393.255 503.711 504 392.788 504 256c0-115.633-79.14-212.779-186.211-240.236C302.678 11.889 288 23.456 288 39.056z"></path></svg>
        </div>

        <button id="save-change-button" class="ml-16 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="saveChange(restaurantId)">Save Changes</button>
    </div>
</template>

<script>
export default {
    name: 'StyleForm',

    data() { 
        return{
            styles: undefined,
            originalStyleValues: undefined,
            editedStyle: Object,
            loadingMode: 'off'
        }
    },

    props: {
        restaurantId: Number
    },
    
    mounted() {
        this.getStyles(this.restaurantId);
    },

    methods: {
        saveChange(id) {
            console.log('click');
            this.loadingMode = 'on';

            let saveChangeButton = document.getElementById('save-change-button');
            saveChangeButton.setAttribute('class', 'hidden');

            // This is a method for updating a style. Since we have style property that consist of key
            // and value, we will make array for one and for two and call patch HTTP method multiple time, but only 
            // for values that have changed from original value.

            // ARRAY FOR CHANGED VALUES AND KEYS
            let updatingValues = []; 
            let updatingKeys = [];

            // console.log('Original array:' + this.originalStyleValues);

            // MAP VALUES INTO AN ARRAY AND KEYS INTO OTHER ARRAY
            let changedStyleValues = this.styles.map(style => style.value);
            // console.log('Changed array: ' + changedStyleValues);

            let keys = this.styles.map(style => style.key);
            // console.log('Changed array: ' + keys);

            // COMPARE ARRAYS AND IF VALUE IS DIFFERENT THEN ORIGINAL VALUE ADD IT TO THE ARRAY
            // SAME AS CORRESPONDING KEY
            for (let i = 0; i < changedStyleValues.length; i++) {
                if (this.originalStyleValues[i] !== changedStyleValues[i]) {
                    updatingValues.push(changedStyleValues[i]);
                    updatingKeys.push(keys[i]);
                }
            }

            // console.log(updatingValues);
            // console.log(updatingKeys);
            // console.log(this.styles);

            // CALL PATCH METHOD TO UPDATE EVERYTHING THAT WAS CHANGED
            for (let i = 0; i < updatingValues.length; i++) {
                this.$service.API.patch('/style/' + id, {
                    'key':      updatingKeys[i],
                    'value':    updatingValues[i]
                })
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                });
            }
            
            setTimeout(() => {
                this.loadingMode = 'off';
                this.hideModal();
            }, 5000);
        },

        hideModal() {
            this.$modal.hide('modal');
        },

        getStyles(id) {
            this.$service.API.get('/style/' + id)
            .then(response => response.data)
            .then(data => {
                // console.log(data.styleProperties);
                this.styles = data.styleProperties;
                this.originalStyleValues = data.styleProperties.map(style => style.value);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
}
</script>