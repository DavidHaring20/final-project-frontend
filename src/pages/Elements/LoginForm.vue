<template>   
    <div>
        <div class="h-screen flex flex-col justify-center items-center">
            <p v-if="message" v-bind:class="messageStyle"> {{ message }}</p>
            <div class="mb-8">
                <div class="flex flex-row mb-5">
                    <div>
                        <p class="pr-5">E-mail: </p>
                    </div>
                    <div>
                        <input
                            v-model="email"
                            type="text" 
                            name="e-mail"
                            class="shadow appearance-none border rounded w-60 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                    </div>
                </div>
                <div>
                    <button 
                        @click="requestVerificationCode()"
                        class="bg-gray-200 w-7/12 px-3 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-500"
                    >Send Verification code</button>
                </div>
            </div>

            <div>
                <div class="flex flex-row mb-5">
                        <p class="pr-5">Passcode: </p>
                        <input 
                            v-model="passcode"
                            type="text"
                            name="passcode" 
                            class="shadow appearance-none border rounded ml-4 w-59 h-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                </div> 

                <button 
                    type="submit"
                    class="bg-gray-200 ml-3 w-11/12 px-3 py-2 rounded-md text-gray-500 hover:bg-gray-300 hover:text-white transition-colors duration-500"
                >Log In</button>
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
                messageStyle: ""
            }
        },

        methods: {
            setMessageStyle(code) {
                if (code == 200) {
                    this.messageStyle = "border-solid border-2 rounded border-green-600 text-green-400 p-3.5 mb-4";
                } else {
                    this.messageStyle = "border-solid border-2 rounded border-red-600 text-red-400 p-3.5 mb-4";
                }
            },

            requestVerificationCode() {

                const data = { "e-mail": this.email } 

                fetch('http://localhost:8000/api/login/e-mail', {
                    method: 'POST', 
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.message = data.message;
                    this.statusCode = data.statusCode;         
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>