<template>
    <div>
        <div v-for="social in socialsArray" v-bind:key="social">
            <!-- These div-s consist of logo + input field + delete button -->                
            
            <div v-if="social == 'Facebook'" class="items-center flex flex-row mt-3">
                <!-- Logo -->
                <div class="w-2/12">
                    <div class="bg-blue-500 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                        <svg class="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </div>
                </div>

                <!-- Input Field --> 
                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="facebookUrl"
                />

                <!-- Button -->
                <Button btnText="Delete" @clicked="alert('Facebook')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Twitter'" class="items-center flex flex-row mt-3">
                <div class="w-2/12">
                    <div class="bg-blue-300 px-4 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                        <svg class="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </div>
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="twitterUrl"
                />

                <Button btnText="Delete" @clicked="alert('Twitter')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Tripadvisor'" class="items-center flex flex-row mt-3">
                <div class="w-2/12">
                    <img :src="tripadvisorImage" alt="Tripadvisor: ">
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="tripadvisorUrl"
                />

                <Button btnText="Delete" @clicked="alert('Tripadvisor')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Foursquare'" class="items-center flex flex-row mt-3">
                <div class="w-2/12">
                    <img :src="foursquareImage" alt="Foursquare: ">
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="foursquareUrl"
                />

                <Button btnText="Delete" @clicked="alert('Foursquare')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Google'" class="items-center flex flex-row mt-3">
                <div class="w-2/12">
                    <img :src="googleImage" alt="Google: ">
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="googleUrl"
                />

                <Button btnText="Delete" @clicked="alert('Google')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Instagram'" class="items-center flex flex-row mt-3">
                <div class="w-2/12">
                    <img :src="instagramImage" alt="Instagram: ">
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="instagramUrl"
                />

                <Button btnText="Delete" @clicked="alert('Instagram')" class="ml-4"/>
            </div>
        </div>
    </div>
</template>

<script>
import tripadvisor from '../../assets/images/tripadvisor.png';
import foursquare from '../../assets/images/foursquare.jpg';
import google from '../../assets/images/google-icon.svg';
import instagram from '../../assets/images/instagram.svg';
import Button from './Button.vue';

export default {
    name: 'SocialInput',

    components: {
        Button
    },

    data() {
        return {
            tripadvisorImage: tripadvisor,
            foursquareImage: foursquare,
            googleImage: google,
            instagramImage: instagram,
            facebookUrl: this.social.facebook_url,
            foursquareUrl: this.social.foursquare_url,
            googleUrl: this.social.google_url,
            instagramUrl: this.social.instagram_url,
            tripadvisorUrl: this.social.tripadvisor_url ,
            twitterUrl: this.social.twitter_url
        }
    },

    props: {
        typeOf: String,
        socialsArray: Array,
        social: Object
    },

    methods: {
        removeFromSocialsArray(socialName) {
            for (let i = 0; i < this.socialsArray.length; i++) {
                if (socialName == this.socialsArray[i]) {
                    this.socialsArray.splice(i, 1);
                    console.log("Removed from an array: " + socialName);

                    let option = document.getElementById(socialName);
                
                    option.setAttribute('class', '#FFFFFF');
                    option.setAttribute('disabled', false);
                }
            }
        },

        alert(socialName) {
            this.$confirm("Are you sure?").then(() => {
            this.removeFromSocialsArray(socialName);
        });
    }
    }
    
}
</script>