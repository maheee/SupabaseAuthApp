<script setup>
import supaAuth from '../services/supaAuth';
</script>

<template>
    <h2>Home</h2>
    <p>You are logged in and are free to use the services provided.</p>

    <p v-if="supaAuth.userInfo?.value?.id">
        <dl>
            <dt>Email</dt>
            <dd>{{ supaAuth.userInfo.value.email }}</dd>
        </dl>
    </p>
    <br/>
</template>
