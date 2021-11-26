<template>   
    <div class="flex flex-row">

        <!-- Left side - Login form -->
        <div class="w-full">
            <!-- Transparent Layer -->
            <div class="ml-24 w-4/12 absolute" style="height: 700px;">
                <div class="mt-36 flex flex-col bg-white p bg-opacity-70">

                    <!-- Login -->
                    <p class="text-2xl text-center font-bold mt-12">PocketMenu Login</p>

                    <!-- Login Form -->
                    <div>
                        <!-- <div class="flex flex-col mt-24 justify-content content-center" style=""> -->
                        <div>
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
                                
                                <div v-if="renderPasscodeSection">
                                    <button 
                                        @click="requestVerificationCode()"
                                        class="bg-gray-200 ml-3 w-full px-3 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-500"
                                    >Send Verification Code</button>
                                </div>
                            </div>
                            
                            <div v-if="renderPasscodeSection == false">
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
                    <!-- </div> -->
                </div>
            </div>
            
            <!-- Image -->
            <img :src="imgLeft" alt="Menu picture." class="w-full" style="height: 700px;">

            <!-- Bottom text -->
            <div class="w-full">
                <p class="text-lg h-full font-bold ml-12 mt-4">Powered by Exevio Ltd.</p>
            </div>
        </div>

        <!-- Right side - Introduction text -->
        <div class="w-full">
            <p class="text-2xl text-center font-bold mt-4 mb-3">PocketMenu</p>
            <img :src="imgRight" alt="Menu picture." class="w-full" style="height: 700px;"> 
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
                renderPasscodeSection: false,
                imgLeft: require('../../assets/images/menu1.jpg'),
                imgRight: require('../../assets/images/menu2.jpg')
            }
        },

        methods: {
            setMessageStyle(code) {
                if (code == 200) {
                    this.messageStyle = "border-solid border-2 rounded font-semibold border-green-600 text-green-400 p-3.5 mb-4";
                    // this.renderPasscodeSection = true;
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
                    
                    this.messageStyle = "border-solid border-2 rounded font-semibold border-red-600 text-red-400 p-3.5 mb-4";
                }
            },

            authenticate() {
                this.$service.API.post('/login/e-mailAndPassword', {
                    email: this.email,
                    passcode: this.passcode
                })
                .then(response => response.data)
                .then(data => {
                    console.log(data);

                    if (data.user) {
                        // SESSION 
                        this.$service.session.isEmailSubmitted =  true,
                        this.$service.session.requestedEmail = this.email,
                        
                        this.statusCode = data.statusCode;

                        this.user_id = data.user.id;
                        this.user_role = data.user.role;
                        this.auth_token = data.authToken;
                    }
                    this.message = data.message;
                    this.setMessageStyle(this.statusCode);
                    this.logIn(data.authenticated);
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

                    if (data.user) {
                        // SESSION 
                        this.$service.session.isEmailSubmitted =  true,
                        this.$service.session.requestedEmail = this.email,
                        
                        this.statusCode = data.statusCode;

                        this.user_id = data.user.id;
                        this.user_role = data.user.role;
                    }

                    this.message = data.message;
                    this.statusCode = data.statusCode; 
                    this.setMessageStyle(this.statusCode);
                    
                    if (data.user.status == 'active') {
                        this.renderPasscodeSection = true;  
                    }  
                })
                .catch(error => {
                    console.log(error);
                    }
                );
            }
        }
    }
</script>