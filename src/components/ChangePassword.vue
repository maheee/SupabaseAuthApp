<script setup>
import supaAuth from '../services/supaAuth';
import { ref } from 'vue';

const signupPassword1 = ref('');
const signupPassword2 = ref('');

const done = ref(false);

const onChangeClick = async () => {
    if (await supaAuth.changePassword(signupPassword1.value, signupPassword2.value)) {
        done.value = true;
    }
};

const onClearClick = () => {
    signupPassword1.value = '';
    signupPassword2.value = '';
    supaAuth.clearError();
};

</script>

<template>
    <h2>Change Password</h2>
    <template v-if="done">
        DONE!
    </template>
    <template v-else>
        <div class="input_element">
            <input type="password" id="signup_password1" name="signup_password1" v-model="signupPassword1" />
            <label for="signup_password1">Password</label>
        </div>
        <div class="input_element">
            <input type="password" id="signup_password2" name="signup_password2" v-model="signupPassword2" />
            <label for="signup_password2">Password</label>
        </div>
        <div class="input_buttons">
            <button type="button" class="secondary" @click="onClearClick">Clear</button>
            <button type="button" class="primary" @click="onChangeClick">Change</button>
        </div>
    </template>
</template>
