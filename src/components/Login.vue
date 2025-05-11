<script setup>
import supaAuth from '../services/supaAuth';
import { ref } from 'vue';

const loginName = ref('');
const loginPassword = ref('');

const onLoginClick = () => {
    supaAuth.signIn(loginName.value, loginPassword.value);
};

const onClearClick = () => {
    loginName.value = '';
    loginPassword.value = '';
    supaAuth.clearError();
};

</script>

<template>
    <h2>Login</h2>
    <div class="input_element">
        <input type="text" id="login_name" name="login_name" v-model="loginName" />
        <label for="login_name">E-Mail</label>
    </div>
    <div class="input_element">
        <input type="password" id="login_password" name="login_password" v-model="loginPassword" />
        <label for="login_password">Password</label>
    </div>
    <div class="input_buttons">
        <button type="button" class="secondary" @click="onClearClick">Clear</button>
        <button type="button" class="primary" @click="onLoginClick">Login</button>
    </div>
</template>
