<template>
    <div>
        <div>
            <h1 class="px-6 text-left text-3xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4 mb-2">Edit Socials</h1>
        </div>
        
        <div class="flex flew-row">
            <h2 class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider">Socials</h2>

            <div class="flex place-self-center mt-1">
                <Button btnText="Add" @clicked="turnOnSelection()"></Button>
            </div>
        </div>

        <hr class="mt-3 ml-5 w-11/12">

        <div v-if="emitMessage == 'On'" class="m-4">
            <h2 class="px-3 text-left text-1xl capitalize font-medium text-gray-500 uppercase tracking-wider">Choose Social</h2>
            
            <select @change="callLog()" v-model="selectedSocial" class="m-2 p-2 text-left text-1xl capitalize font-medium text-gray-500 uppercase tracking-wider border border-gray-600 rounded">
                <option disabled value="">Please select one</option>
                <option id="Facebook">Facebook</option>
                <option id="Foursquare">Foursquare</option>
                <option id="Google">Google</option>
                <option id="Instagram">Instagram</option>
                <option id="Tripadvisor">Tripadvisor</option>
                <option id="Twitter">Twitter</option>
            </select>

            <div>
                <SocialInput
                :typeOf="selectedSocial"
                :socialsArray="socials"
                :social="social"
                @update-social="updateSocial(restaurantId, $event.fbUrl, $event.fsUrl, $event.ggUrl,
                                             $event.igUrl, $event.taUrl, $event.twUrl)"
                ></SocialInput>
            </div>
        </div>
    </div>
</template>

<script>
import Button from './Button.vue';
import SocialInput from './SocialInput.vue';

export default {
    name: 'SocialForm',

    mounted() {
        this.getSocial(this.restaurantId)
    },

    props: {
        restaurantId: undefined
    },

    components: {
        Button,
        SocialInput
    },

    data() {
        return {
            emitMessage: '',
            selectedSocial: '',
            socials: [],
            social: undefined
        }
    },

    methods: {
        updateSocial(id, fbUrl, fsUrl, ggUrl, igUrl, taUrl, twUrl) {
            this.$service.API.patch('/social/' + id, {
                'facebookUrl': fbUrl,
                'foursquareUrl': fsUrl,
                'googleUrl': ggUrl,
                'instagramUrl': igUrl,
                'tripadvisorUrl': taUrl,
                'twitterUrl': twUrl
            })
            .then(response => response.data)
            .then(() => {
                this.$modal.hide('modal')
            });
        },

        getSocial(id) {
            this.$service.API.get('/social/' + id)
            .then(response => response.data)
            .then(data => {
                console.log(data.social);
                this.social = data.social;
            })
        },

        turnOnSelection() {
            this.emitMessage = 'On';
        },

        callLog() {
            if (!this.socials.includes(this.selectedSocial)) {
                console.log(this.selectedSocial);
                this.socials.push(this.selectedSocial);

                let option = document.getElementById(this.selectedSocial);
                
                option.setAttribute('class', 'bg-gray-300');
                option.setAttribute('disabled', true);
            } 
        }
    }
}
</script>