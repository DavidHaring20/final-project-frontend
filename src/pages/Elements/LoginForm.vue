<template>   
<!-- style="font-family: Roboto" -->
    <div class="flex flex-row">

        <!-- Left side - Login form -->
        <div class="w-full">
            <!-- Transparent Layer -->
            <div class="ml-28 w-4/12 absolute" style="height: 700px;">
                <div class="mt-36 flex flex-col bg-white bg-opacity-70 rounded-lg">

                    <!-- Login -->
                    <p class="text-3xl text-center font-bold mt-12">PocketMenu Login</p>

                    <!-- Login Form -->
                    <div class="flex flex-col w-full">
                        <!-- <div class="flex flex-col mt-24 justify-content content-center" style=""> -->
                        

                        <!-- Section for email and verification code request -->
                        <div class="flex flex-col mt-8 ml-28 mb-4">
                            <div class="">
                                
                                <!-- Display notification message -->
                                <div>
                                    <p v-if="message" v-bind:class="messageStyle" style="max-width: 32ch; font-family: Roboto; font-weight: 300; font-size: 18px;"> {{ message }}</p>
                                </div>

                                <div>
                                    <p class="mb-3 text-lg" style="font-family: Roboto; font-weight: 700;">E-mail </p>
                                </div>
                                <div>
                                    <input
                                        @keyup.enter="requestVerificationCode()"
                                        v-model="email"
                                        type="text" 
                                        name="e-mail"
                                        class="shadow mb-4 appearance-none border-black border-2 rounded w-72 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                </div>
                            </div>
                            
                            <!-- v-if  -->
                            <div class="ml-5">
                                <button 
                                    @click="requestVerificationCode()"
                                    class="bg-black px-5 w-60 tracking-wider py-2 rounded-md text-white hover:bg-white hover:text-black transition-colors duration-500" 
                                    style="font-family: Roboto; font-weight: 300;"
                                >Send Verification Code</button>
                            </div>
                        </div>
                            
                        <!-- Section for Passcode input and Login Button -->
                        <div v-if="renderPasscodeSection == true" class="mt-4 ml-28 pb-10">
                            <div class="mb-3">
                                    <p class="mb-3 text-lg" style="font-family: Roboto; font-weight: 700;">Passcode </p>
                                    <input 
                                        @keyup.enter="authenticate()"
                                        v-model="passcode"
                                        type="text"
                                        name="passcode" 
                                        class="shadow appearance-none border-black border-2 rounded w-72 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                            </div> 

                            <button 
                                @click="authenticate()"
                                class="ml-5 bg-black px-5 w-60 tracking-wider py-1.5 rounded-md text-white hover:bg-white hover:text-black transition-colors duration-500"
                                style="font-family: Roboto; font-weight: 300;"
                            >Log In</button>
                        </div>
                        <!-- </div> -->
                    </div>
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

            <!-- Title -->
            <p class="text-2xl text-center font-bold mt-4 mb-3">PocketMenu</p>

            <!-- Transparent Layer -->
            <div class="ml-28 w-4/12 absolute" style="height: 700px;">
                <div class="mt-20 py-24 flex flex-col bg-white bg-opacity-70 rounded-lg">
                    <p class="px-12 py-3 text-3xl font-light tracking-wider">PocketMenu offers easy and efficient way of managing restaurant’s, 
                        fast food’s or caffe bar menu. We provide simple, easy to use, 
                        but powerful way of changing, creating and keeping your menu up to date.
                    </p>
                </div>
            </div>

            <!-- Image -->
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
                    // max-h-20
                    this.messageStyle = "border-solid border-2 rounded border-green-600 text-green-400 bg-white text-center p-1.5 mb-4";
                    // this.renderPasscodeSection = true;
                } else {
                    this.messageStyle = "border-solid border-2 rounded border-red-600 text-red-400 bg-white text-center p-1.5 mb-4";
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
                    this.messageStyle = "border-solid border-2 rounded border-red-600 text-red-400 bg-white text-center p-1.5 mb-4"
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