<template>
    <div>
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