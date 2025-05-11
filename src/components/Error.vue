<script setup>
import supaAuth from '@/services/supaAuth';
import errorCodes from '@/errorCodes';
</script>

<template>
    <div class="error_box" v-if="supaAuth.errorCode?.value">
        <h3>Error</h3>
        <p>{{ errorCodes[supaAuth.errorCode.value] }}</p>
    </div>
</template>
