<template>
    <div>
        <div v-for="social in socialsArray" v-bind:key="social">
            <!-- These div-s consist of logo + input field + delete button -->                
            
            <div v-if="social == 'Facebook'" class="items-center flex flex-row mt-3 h-16">
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

            <div v-else-if="social == 'Twitter'" class="items-center flex flex-row mt-3 h-16">
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

            <div v-else-if="social == 'Tripadvisor'" class="items-center flex flex-row mt-3 h-16">
                <div class="w-2/12">
                    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3419.41 1586.52"><defs></defs><title>Tripadvisor_Logo_circle-green_vertical-lockup_registered_RGB</title><path d="M3517.77,1560.27a24.85,24.85,0,1,0,24.85,24.85A24.87,24.87,0,0,0,3517.77,1560.27Zm0,45.79a20.94,20.94,0,1,1,20.94-20.94A21,21,0,0,1,3517.77,1606.06Zm8.06-25.16c0-4.53-3.23-7.21-7.91-7.21h-8v22.62h3.91v-8.21h4.23l4.11,8.21h4.2l-4.53-9A6.52,6.52,0,0,0,3525.83,1580.9Zm-8.11,3.74h-3.84v-7.49h3.84c2.62,0,4.2,1.32,4.2,3.75S3520.34,1584.64,3517.72,1584.64ZM523,1308.76v-60.1H430.86v357.62H523V1391.85C523,1353,548,1334,586.79,1334h50.42v-85.29H594.12C560.41,1248.66,531.09,1266.25,523,1308.76Zm200.53-201.57c-31.51,0-55.69,24.92-55.69,56.43a55.7,55.7,0,1,0,111.4,0C779.27,1132.11,755.08,1107.19,723.56,1107.19Zm-46,499.09h91.93V1248.66H677.6Zm529.95-178.81c0,102.09-82.76,184.85-184.85,184.85A177.9,177.9,0,0,1,914.19,1576v135.23H822.26V1248.66h91.93v30.24a177.9,177.9,0,0,1,108.51-36.28C1124.79,1242.62,1207.55,1325.38,1207.55,1427.47Zm-92.53,0a100.42,100.42,0,1,0-100.41,100.42A100.41,100.41,0,0,0,1115,1427.47Zm1690.76-31.37-53.64-14.72c-35.29-9.18-49-20-49-38.66,0-18.19,19.32-30.89,47-30.89,26.34,0,47,17.26,47,39.29v2h84.74v-2c0-64.9-52.93-108.5-131.72-108.5-78.05,0-134.7,43.57-134.7,103.6,0,46.71,31,81.89,85,96.52l51.38,14c39,10.8,53.54,22.8,53.54,44.27,0,22.67-21,37.9-52.19,37.9-32.55,0-54.42-20.58-54.42-51.2v-2h-90v2c0,73.37,59.07,124.61,143.64,124.61,81.5,0,140.65-50,140.65-119C2893,1459.57,2877.83,1415.32,2805.78,1396.1Zm-1272-147.44h91.93v357.62h-91.93V1576a177.91,177.91,0,0,1-108.52,36.28c-102.09,0-184.85-82.76-184.85-184.85s82.76-184.85,184.85-184.85a177.91,177.91,0,0,1,108.52,36.28Zm0,178.82v0a100.42,100.42,0,1,0-100.42,100.43A100.42,100.42,0,0,0,1533.76,1427.46Zm424-306.11h91.93v484.91h-91.93V1576a177.91,177.91,0,0,1-108.52,36.28c-102.09,0-184.85-82.76-184.85-184.85s82.76-184.85,184.85-184.85a177.91,177.91,0,0,1,108.52,36.28Zm0,306.1a100.42,100.42,0,1,0-100.42,100.42A100.41,100.41,0,0,0,1957.72,1427.47Zm518.9,178.81h91.93V1248.66h-91.93Zm46-499.09c-31.52,0-55.7,24.92-55.7,56.43a55.7,55.7,0,1,0,111.4,0C2578.29,1132.11,2554.1,1107.19,2522.59,1107.19Zm767.83,320.28c0,102.09-82.76,184.85-184.85,184.85s-184.85-82.76-184.85-184.85,82.76-184.85,184.85-184.85S3290.42,1325.38,3290.42,1427.47Zm-84.43,0a100.42,100.42,0,1,0-100.42,100.42A100.41,100.41,0,0,0,3206,1427.47Zm-2730-306.1H123.21v82H253.77v402.88h91.61V1203.4H475.94Zm1783.85,387L2178,1248.66h-96.58l122.69,357.62h110.64l123.41-357.62h-96.58Zm1165.38-199.59v-60.1H3333v357.62h92.18V1391.85c0-38.84,24.92-57.9,63.76-57.9h50.42v-85.29h-43.09C3462.54,1248.66,3433.23,1266.25,3425.17,1308.76Z" transform="translate(-123.21 -124.75)"/><circle class="cls-1" cx="1708.04" cy="470.28" r="470.28"/><path d="M2121.68,503.25l56.77-61.76H2052.61a393.1,393.1,0,0,0-442.34,0H1484.1l56.77,61.76A173.48,173.48,0,1,0,1775.66,758.7l55.62,60.51,55.58-60.47a172.83,172.83,0,0,0,117.86,46.2c95.81,0,173.55-77.67,173.55-173.48A173.05,173.05,0,0,0,2121.68,503.25ZM1657.76,748.86a117.4,117.4,0,1,1,117.4-117.4A117.4,117.4,0,0,1,1657.76,748.86Zm173.52-120.78c0-77.26-56.2-143.55-130.31-171.9a338.82,338.82,0,0,1,260.59,0C1887.46,484.54,1831.28,550.83,1831.28,628.08Zm173.44,120.78a117.4,117.4,0,1,1,117.4-117.4A117.4,117.4,0,0,1,2004.72,748.86Zm0-178.94a61.55,61.55,0,1,0,61.55,61.54A61.54,61.54,0,0,0,2004.72,569.92Zm-285.41,61.54a61.55,61.55,0,1,1-61.55-61.54A61.55,61.55,0,0,1,1719.31,631.46Z" transform="translate(-123.21 -124.75)"/></svg>
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="tripadvisorUrl"
                />

                <Button btnText="Delete" @clicked="alert('Tripadvisor')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Foursquare'" class="items-center flex flex-row mt-3 h-16">
                <div class="w-2/12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><path d="M47.273 9.242l-1.533 7.402c-.175.788-.92 1.5-1.84 1.5H30.586a2.73 2.73 0 0 0-2.716 2.716v1.62a2.73 2.73 0 0 0 2.716 2.716h11.256c1.05 0 1.927 1.007 1.708 2.102l-1.533 7.534c-.088.657-.788 1.5-1.84 1.5H30.98c-1.927.044-2.32.088-3.46 1.5L16.307 51.815c-.088.13-.175.088-.175-.044V8.9a1.85 1.85 0 0 1 1.84-1.84H45.6c.964 0 1.927.964 1.664 2.2M49.288 0h-34.12C10.482 0 9.08 3.548 9.08 5.782v54.224c0 2.672 1.358 3.46 2.102 3.767s2.716.526 4.117-.876l16.47-19.184c.263-.307.394-.307.57-.307h10.25c4.38 0 5.212-3.022 5.694-4.862C48.677 37.01 53.19 15.11 54.6 8.19 55.64 2.847 54.28 0 49.288 0" fill="#fa4778"/></svg>                
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="foursquareUrl"
                />

                <Button btnText="Delete" @clicked="alert('Foursquare')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Google'" class="items-center flex flex-row mt-3 h-16">
                <div class="w-2/12">
                    <svg width="52px" height="36px" viewBox="0 0 256 262" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                        <g>
                            <path d="M255.878,133.451 C255.878,122.717 255.007,114.884 253.122,106.761 L130.55,106.761 L130.55,155.209 L202.497,155.209 C201.047,167.249 193.214,185.381 175.807,197.565 L175.563,199.187 L214.318,229.21 L217.003,229.478 C241.662,206.704 255.878,173.196 255.878,133.451" fill="#4285F4"></path>
                            <path d="M130.55,261.1 C165.798,261.1 195.389,249.495 217.003,229.478 L175.807,197.565 C164.783,205.253 149.987,210.62 130.55,210.62 C96.027,210.62 66.726,187.847 56.281,156.37 L54.75,156.5 L14.452,187.687 L13.925,189.152 C35.393,231.798 79.49,261.1 130.55,261.1" fill="#34A853"></path>
                            <path d="M56.281,156.37 C53.525,148.247 51.93,139.543 51.93,130.55 C51.93,121.556 53.525,112.853 56.136,104.73 L56.063,103 L15.26,71.312 L13.925,71.947 C5.077,89.644 0,109.517 0,130.55 C0,151.583 5.077,171.455 13.925,189.152 L56.281,156.37" fill="#FBBC05"></path>
                            <path d="M130.55,50.479 C155.064,50.479 171.6,61.068 181.029,69.917 L217.873,33.943 C195.245,12.91 165.798,0 130.55,0 C79.49,0 35.393,29.301 13.925,71.947 L56.136,104.73 C66.726,73.253 96.027,50.479 130.55,50.479" fill="#EB4335"></path>
                        </g>
                    </svg>
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="googleUrl"
                />

                <Button btnText="Delete" @clicked="alert('Google')" class="ml-4"/>
            </div>

            <div v-else-if="social == 'Instagram'" class="items-center flex flex-row mt-3 h-16">
                <div class="w-2/12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="52" height="36" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>

                <input class="ml-3 shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="input"
                    v-model="instagramUrl"
                />

                <Button btnText="Delete" @clicked="alert('Instagram')" class="ml-4"/>
            </div>
        </div>

        <button class="ml-6 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" @click="updateSocial()">{{ buttonText }}</button>
    </div>
</template>

<script>
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
            facebookUrl: this.social.facebook_url,
            foursquareUrl: this.social.foursquare_url,
            googleUrl: this.social.google_url,
            instagramUrl: this.social.instagram_url,
            tripadvisorUrl: this.social.tripadvisor_url ,
            twitterUrl: this.social.twitter_url,
            facebookUrlOriginal: this.social.facebook_url,
            foursquareUrlOriginal: this.social.foursquare_url,
            googleUrlOriginal: this.social.google_url,
            instagramUrlOriginal: this.social.instagram_url,
            tripadvisorUrlOriginal: this.social.tripadvisor_url ,
            twitterUrlOriginal: this.social.twitter_url
        }
    },

    props: {
        typeOf: String,
        socialsArray: Array,
        social: Object,
        buttonText: String
    },

    methods: {
        updateSocial() {
            this.$emit('update-social', { fbUrl: this.facebookUrl, fsUrl: this.foursquareUrl, ggUrl: this.googleUrl,
                                          igUrl: this.instagramUrl, taUrl: this.tripadvisorUrl, twUrl: this.twitterUrl});
        },

        removeFromSocialsArray(socialName) {
            for (let i = 0; i < this.socialsArray.length; i++) {
                if (socialName == this.socialsArray[i]) {
                    this.socialsArray.splice(i, 1);
                    console.log("Removed from an array: " + socialName);

                    let option = document.getElementById(socialName);
                
                    if (socialName.toLowerCase() === 'facebook') {
                        this.facebookUrl = this.facebookUrlOriginal;
                    } else if (socialName.toLowerCase() === 'foursquare') {
                        this.foursquareUrl = this.foursquareUrlOriginal;
                    } else if (socialName.toLowerCase() ===  'google') {
                        this.googleUrl = this.googleUrlOriginal;
                    } else if (socialName.toLowerCase() === 'instagram') {
                        this.instagramUrl = this.instagramUrlOriginal;
                    } else if (socialName.toLowerCase() === 'tripadvisor') {
                        this.tripadvisorUrl = this.tripadvisorUrlOriginal;
                    } else {
                        this.twitterUrl = this.twitterUrlOriginal;
                    }

                    option.setAttribute('class', '#FFFFFF');
                    option.removeAttribute('disabled');
                }
            }
        },

        alert(socialName) {
            this.$confirm("Are you sure? Changes won't be saved.").then(() => {
            this.removeFromSocialsArray(socialName);
        });
    }
    }
    
}
</script>