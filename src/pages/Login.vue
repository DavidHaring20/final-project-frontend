<template>
    <div class="w-full">
        <LoginForm/>
    </div>
</template>

<script>
    import LoginForm from './Elements/LoginForm.vue';

    export default {
        path: '/',
        name: 'Login',
        
        components: {
            LoginForm
        }
    }   
</script>