<script setup>
import { ref, watch } from 'vue';
import Loading from './components/Loading.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import ChangePassword from './components/ChangePassword.vue';
import Error from './components/Error.vue';
import config from './config';
import supaAuth from './services/supaAuth';

supaAuth.init(
  config.SUPABASE_URL,
  config.SUPABASE_ANON_KEY,
  config.OWN_BASE_URL);

const selectedOutside = ref('LOGIN');
const selectedInside = ref('HOME');

watch(supaAuth.state, async (oldState, newState) => {
  if (oldState !== newState) {
    selectedOutside.value = 'LOGIN';
    selectedInside.value = 'HOME';
  }
});

const navOutside = target => {
  selectedOutside.value = target;
  supaAuth.clearError();
};

const navInside = target => {
  selectedInside.value = target;
  supaAuth.clearError();
};
</script>

<template>
  <header>
    <h1>{{ config.TITLE }}</h1>
  </header>

  <main>
    <Loading v-if="supaAuth.loading.value" />

    <template v-if="supaAuth.state.value == 'LOGIN'">
      <Login v-if="selectedOutside == 'LOGIN'" />
      <SignUp v-if="selectedOutside == 'SIGN_UP'" />
      <ForgotPassword v-if="selectedOutside == 'FORGOT_PW'" />
      <div class="nav_links">
        <a v-if="selectedOutside != 'LOGIN'" href="#" @click="navOutside('LOGIN')">Login</a>
        <a v-if="selectedOutside != 'SIGN_UP'" href="#" @click="navOutside('SIGN_UP')">Sign Up</a>
        <a v-if="selectedOutside != 'FORGOT_PW'" href="#" @click="navOutside('FORGOT_PW')">Forgot Password</a>
      </div>
    </template>

    <template v-if="supaAuth.state.value == 'INSIDE'">
      <Home v-if="selectedInside == 'HOME'"/>
      <ChangePassword v-if="selectedInside == 'CHANGE_PW'"/>
      <div class="nav_links">
        <a href="#" @click="supaAuth.signOut()">Log out</a>
        <a v-if="selectedInside != 'HOME'" href="#" @click="navInside('HOME')">Home</a>
        <a v-if="selectedInside != 'CHANGE_PW'" href="#" @click="navInside('CHANGE_PW')">Change Password</a>
      </div>
    </template>

    <template v-if="supaAuth.state.value == 'PW_RECOVERY'">
      <ChangePassword />
    </template>

    <Error />
  </main>

  <div id="spacer"></div>

  <footer>
    <a :href="config.IMPRINT_URL" target="_blank">Imprint</a>
  </footer>
</template>
