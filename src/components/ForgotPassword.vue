<script setup>
import supaAuth from '../services/supaAuth';
import { ref } from 'vue';

const resetName = ref('');

const done = ref(false);

const onResetClick = async () => {
    if (await supaAuth.resetPassword(resetName.value)) {
        done.value = true;
    }
};

const onClearClick = () => {
    resetName.value = '';
    supaAuth.clearError();
};

</script>

<template>
    <h2>Forgot Password</h2>
    <template v-if="done">
        DONE!
    </template>
    <template v-else>
        <div class="input_element">
            <input type="text" id="reset_name" name="reset_name" v-model="resetName" />
            <label for="reset_name">E-Mail</label>
        </div>
        <div class="input_buttons">
            <button type="button" class="secondary" @click="onClearClick">Clear</button>
            <button type="button" class="primary" @click="onResetClick">Reset</button>
        </div>
    </template>
</template>
