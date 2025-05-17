<script setup>
import supaAuth from '../services/supaAuth';
import { ref } from 'vue';

const signupName = ref('');
const signupPassword1 = ref('');
const signupPassword2 = ref('');

const done = ref(false);

const onSignupClick = async () => {
    if (await supaAuth.signUp(signupName.value, signupPassword1.value, signupPassword2.value)) {
        done.value = true;
    }
};

const onClearClick = () => {
    signupName.value = '';
    signupPassword1.value = '';
    signupPassword2.value = '';
    supaAuth.clearError();
};

</script>

<template>
    <h2>Sign Up</h2>
    <template v-if="done">
        <p>You've successfully registered. You will be sent an email with a confirmation link to confirm your account.</p>
        <br/>
    </template>
    <template v-else>
        <div class="input_element">
            <input type="text" id="signup_name" name="signup_name" v-model="signupName" v-on:keyup.enter="onSignupClick" />
            <label for="signup_name">E-Mail</label>
        </div>
        <div class="input_element">
            <input type="password" id="signup_password1" name="signup_password1" v-model="signupPassword1" v-on:keyup.enter="onSignupClick" />
            <label for="signup_password1">Password</label>
        </div>
        <div class="input_element">
            <input type="password" id="signup_password2" name="signup_password2" v-model="signupPassword2" v-on:keyup.enter="onSignupClick" />
            <label for="signup_password2">Password</label>
        </div>
        <div class="input_buttons">
            <button type="button" class="secondary" @click="onClearClick">Clear</button>
            <button type="button" class="primary" @click="onSignupClick">Sign Up</button>
        </div>
    </template>
</template>
