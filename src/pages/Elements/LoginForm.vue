<template>   
    <div>
        <div class="h-screen w-screen overflow-x-hidden overflow-y-hidden absolute z-0">
            <div class="relative bg-gray-400" style="top: -50%; left: 0px; height: 100%; width: 110%; transform: rotate(8deg)"></div>
            <div class="relative bg-gray-400" style="top: -160%; left: 0px; height: 100%; width: 110%;"></div>
        </div>

        <div class="z-10 h-screen relative flex flex-col justify-center items-center">

            <div class="border-solid bg-white p-20 text-center border-gray-600 shadow-xl" style="border-width: 4px; border-radius: 10%">
            <div class="h-32 mb-8 justify-center flex">
                <p v-if="message" v-bind:class="messageStyle" style="max-width: 35ch; max-height: 5rem; justify-items:center; align-self-center"> {{ message }}</p>
            </div>
                <div class="mb-8">
                    <div class="flex flex-row mb-5">
                        <div>
                            <p class="pr-5 font-bold">E-mail: </p>
                        </div>
                        <div>
                            <input
                                @keyup.enter="requestVerificationCode()"
                                v-model="email"
                                type="text" 
                                name="e-mail"
                                class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                        </div>
                    </div>
                    <div v-if="renderPasscodeSection == ''">
                        <button 
                            @click="requestVerificationCode()"
                            class="bg-gray-200 ml-3 w-full px-3 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-500"
                        >Send Verification code</button>
                    </div>
                </div>

                <div v-if="renderPasscodeSection">
                    <div class="flex flex-row mb-5">
                            <p class="pr-5 font-bold">Passcode: </p>
                            <input 
                                @keyup.enter="authenticate()"
                                v-model="passcode"
                                type="text"
                                name="passcode" 
                                class="shadow appearance-none border rounded ml-4 w-59 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                    </div> 

                    <button 
                        @click="authenticate()"
                        class="bg-gray-200 ml-3 w-full px-3 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-500"
                    >Log In</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LoginForm',

        data() {
            return {
                email: "",
                passcode: "",
                message: "",
                statusCode: 0,
                messageStyle: "",
                user_id: 0,
                auth_token: 0,
                user_role: "",
                renderPasscodeSection: false
            }
        },

        methods: {
            setMessageStyle(code) {
                if (code == 200) {
                    this.messageStyle = "border-solid border-2 rounded font-semibold border-green-600 text-green-400 p-3.5 mb-4";
                    this.renderPasscodeSection = true;
                } else {
                    this.messageStyle = "border-solid border-2 rounded font-semibold border-red-600 text-red-400 p-3.5 mb-4";
                }
            },

            logIn(authenticated) {
                if (authenticated === true) {
                    this.$service.session.isActive = true;
                    this.$service.session.user_id =  this.user_id;
                    this.$service.session.auth_token = this.auth_token;
                    this.$service.session.user_role = this.user_role;
                    console.log(this.$service.session);
                    this.$router.push({ name: 'Home'});
                } else {
                    console.log('Failed to go to Login Page.');
                }
            },

            authenticate() {
                this.$service.API.post('/login/e-mailAndPassword', {
                    email: this.email,
                    passcode: this.passcode
                })
                .then(response => response.data)
                .then(data => {
                    // SESSION 
                    this.$service.session.isEmailSubmitted =  true,
                    this.$service.session.requestedEmail = this.email,
                    
                    this.message = data.message;
                    this.statusCode = data.statusCode;

                    this.user_id = data.user.id;
                    this.user_role = data.user.role;
                    this.auth_token = data.authToken;
                    
                    this.setMessageStyle(this.statusCode);
                    this.logIn(data.authenticated)
                })
                .catch(error => {
                    console.log(error);
                });       
            },

            requestVerificationCode() {
                this.$service.API.post('/login/e-mail', {
                    email: this.email
                })
                .then(response => response.data)
                .then(data => {
                    console.log(data);
                    this.message = data.message;
                    this.statusCode = data.statusCode; 
                    this.setMessageStyle(this.statusCode);
                })
                .catch(error => {
                    console.log(error);
                    }
                );
            }
        }
    }
</script>