<template>
    <div>
        <h2 class="px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4">Language</h2>
        <table class="ml-16 mt-16 mr-16 mb-6 w-4/5">
            <thead>
                <tr class="border-4"> 
                    <th class="ml-4 p-4">Number</th>
                    <th class="ml-4 p-4">Language Code</th>
                    <th class="ml-4 p-4">Language Name</th>
                    <th class="ml-4 p-4">Update</th>
                    <th class="ml-4 p-4">Delete</th>
                </tr>
            </thead>
            <tbody v-for="(language, index) in languages" :key="language.id">
                <Language
                :language="language"
                :index="index"
                @deletedLanguage="removeLanguage($event.deleted)" 
                @update-language="setCodeForUpdatedLanguage($event.updateLanguage)"   
            />
            </tbody>
        </table>

        <button 
            v-if="emitMessage == ''"
            class="ml-16 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" 
            @click="newLanguageModeOn()"
        >
            Create New Language
        </button>

        <div v-if="emitMessage == 'Create New Language'" class="ml-16 mt-16">
            <hr class="w-2/5 mt-4 mb-2 ml-6">
            <h2 class="mt-6 mb-8 px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4" >New Language</h2>

            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    Language Code
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="languageCode"
                placeholder="hr | esp | it"
                />
            </div>
            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    Language Name
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="languageName"
                placeholder="Engleski | Talijanski | Španjolski"
                />
            </div>

            <div class="h-72">
                <button 
                    class="ml-16 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" 
                    @click="create()"
                >
                    Create Language
                </button>
            </div>
        </div>

        <div v-else-if="emitMessage == 'Edit Language'" class="ml-16 mt-16">
            <hr class="w-2/5 mt-4 mb-2 ml-6">
            <h2 class="mt-6 mb-8 px-6 text-left text-2xl capitalize font-medium text-gray-500 uppercase tracking-wider mt-4" >Edit Language</h2>

            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    Language Code
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="languageCode"
                placeholder="hr | esp | it"
                />
            </div>
            <div class="mt-8 mb-4">
                <label class="block text-gray-700 text-xs mb-2 " for="input">
                    Language Name
                </label>
                <input class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            
                name="input"
                v-model="languageName"
                placeholder="Engleski | Talijanski | Španjolski"
                />
            </div>

            <div class="h-72">
                <button 
                    class="ml-16 mt-6 bg-green-500 hover:bg-green-700 text-white font-bold text-xs py-2 px-6 rounded transition-colors duration-300" 
                    @click="saveChanges()"
                >
                    Save Changes
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import Language from './Language.vue';

export default {
    name: 'LanguageTable',

    components: {
        Language
    },

    data() {
        return {
            languages: undefined,
            emitMessage: '',
            languageCode: '',
            languageName: '',
            languageCodeUpdate: '',
            errorMessages: []
        }
    },

    mounted() {
        this.getLanguages();
    },

    methods: {
        getLanguages() {
            this.$service.API.get('/languages')
            .then(response => response.data)
            .then(data => {
                this.languages = data.data.languages;
            })
            .catch(error => {
                console.log(error);
            });
        },

        newLanguageModeOn() {
            this.emitMessage = 'Create New Language';
        },

        editLanguageModeOn() {
            this.emitMessage = 'Edit Language';
        },

        setCodeForUpdatedLanguage(updateLanguage) {
            console.log(updateLanguage);
            this.languageCodeUpdate = updateLanguage.language_code;
            this.languageCode = updateLanguage.language_code;
            this.languageName = updateLanguage.language_name;
            this.editLanguageModeOn();
        },

        removeLanguage(deletedLanguage) {
            console.log(deletedLanguage);
            let languagesTemp = this.languages.filter( language => language.language_code != deletedLanguage.language_code);
            this.languages = languagesTemp;

            this.languageCode = '';
            this.languageName = '';
            this.emitMessage = '';
        },

        create() {
            this.$service.API.post('/languages/new', {
                languageCode: this.languageCode,
                languageName: this.languageName
            })
            .then(response => response.data)
            .then(data => {
                if (data.newLanguage) {
                    this.languages.push(data.newLanguage);
                    self.$toastr.success('Language created.', 'Success');
                } else {    
                    for (let key in data.errorMessage) {
                        this.$toastr.error(data.errorMessage[key][0], 'Warning');
                    }
                }
            })      
            .catch(error => {
                console.log(error);
            });

            this.languageCode = '';
            this.languageName = '';
            this.emitMessage = '';
        },

        saveChanges() {
            this.$service.API.patch('/languages/' + this.languageCodeUpdate, 
            {
                languageCode: this.languageCode,
                languageName: this.languageName
            })
            .then(response => response.data)
            .then(data => {
                console.log(data);

                if (data.updatedLanguage) {
                    let languagesTemp = this.languages.filter( language => language.id != data.updatedLanguage.id);
                    this.languages = languagesTemp;
                    this.languages.push(data.updatedLanguage);
                    this.$toastr.success('Changes saved.', 'Success');
                } else {
                    for (let key in data.errorMessage) {
                        this.$toastr.error(data.errorMessage[key][0], 'Warning');
                    }
                }
            })
            .catch(error => {
                console.log(error);
            }); 

            this.languageCode = '';
            this.languageName = '';
            this.emitMessage = '';
        }
    }
}
</script>