<script setup>
import supaAuth from '@/services/supaAuth';
import errorCodes from '@/errorCodes';

const props = defineProps(['errorCode']);
const emit = defineEmits(['clear']);
</script>

<template>
    <div class="error_box" v-if="supaAuth.errorCode?.value || errorCode">
        <h3>Error <button @click="emit('clear')">X</button></h3>
        <p>{{ errorCodes[supaAuth.errorCode?.value || errorCode] }}</p>
    </div>
</template>
