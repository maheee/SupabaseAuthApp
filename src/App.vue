<script setup>
import { ref, watch } from 'vue';
import Loading from './components/Loading.vue';
import Home from './components/Home.vue';
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import ForgotPassword from './components/ForgotPassword.vue';
import ChangePassword from './components/ChangePassword.vue';
import Error from './components/Error.vue';
import configProvider from './config';
import supaAuth from './services/supaAuth';

let config = configProvider.getConfig();

supaAuth.init(
  config.SUPABASE_URL,
  config.SUPABASE_ANON_KEY,
  config.OWN_BASE_URL,
  config.SET_COOKIE,
  config.COOKIE_DOMAIN);

const selectedOutside = ref('LOGIN');
const selectedInside = ref('HOME');
const outsideErrorCode = ref(null);

// read url parameters and store redirect url
const currentLocation = new URL(location.href);
let redirectAfterLogin = currentLocation.searchParams.get('redirect_url');

// read hash parameters and check for errors
if (currentLocation.hash?.length) {
  const hashParams = new URL('http://l?' + currentLocation.hash.substring(1)).searchParams;
  if (hashParams.get('error_code')?.length) {
    outsideErrorCode.value = hashParams.get('error_code')
  }
}

// check if redirect requirements are met and redirect
const runRedirects = () =>{
  if (supaAuth.state.value == 'INSIDE') {
    if (redirectAfterLogin) {
      window.location.href = redirectAfterLogin;
    }
  }
};
runRedirects();

// watch for state changes and set start page
watch(supaAuth.state, async (oldState, newState) => {
  if (oldState !== newState) {
    selectedOutside.value = 'LOGIN';
    selectedInside.value = 'HOME';
    clearErrors();
  }
  runRedirects();
});

// helper

const navOutside = target => {
  selectedOutside.value = target;
  supaAuth.clearError();
};

const navInside = target => {
  selectedInside.value = target;
  supaAuth.clearError();
};

const clearErrors = () => {
  outsideErrorCode.value = null;
  supaAuth.clearError();
  window.location.hash = '';
};
</script>

<template>
  <header>
    <h1>{{ config.TITLE }}</h1>
  </header>

  <main>
    <Loading v-if="supaAuth.loading.value" />

    <template v-if="supaAuth.state.value == 'LOGIN'">
      <Login v-if="selectedOutside == 'LOGIN'" @clear="clearErrors()" />
      <SignUp v-if="selectedOutside == 'SIGN_UP'" @clear="clearErrors()" />
      <ForgotPassword v-if="selectedOutside == 'FORGOT_PW'" @clear="clearErrors()" />
      <div class="nav_links">
        <a v-if="config.ENABLE_FORGOT_PASSWORD && selectedOutside != 'FORGOT_PW'" href="#" @click="navOutside('FORGOT_PW')">Forgot Password</a>
        <a v-if="selectedOutside != 'LOGIN'" href="#" @click="navOutside('LOGIN')">Login</a>
        <a v-if="config.ENABLE_SIGN_UP && selectedOutside != 'SIGN_UP'" href="#" @click="navOutside('SIGN_UP')">Sign Up</a>
      </div>
    </template>

    <template v-if="supaAuth.state.value == 'INSIDE'">
      <Home v-if="selectedInside == 'HOME'"/>
      <ChangePassword v-if="selectedInside == 'CHANGE_PW'" @clear="clearErrors()" />
      <div class="nav_links">
        <a v-if="selectedInside != 'HOME'" href="#" @click="navInside('HOME')">Home</a>
        <a v-if="config.ENABLE_CHANGE_PASSWORD && selectedInside != 'CHANGE_PW'" href="#" @click="navInside('CHANGE_PW')">Change Password</a>
        <a href="#" @click="supaAuth.signOut()">Log out</a>
      </div>
    </template>

    <template v-if="supaAuth.state.value == 'PW_RECOVERY'">
      <ChangePassword @clear="clearErrors()" />
    </template>

    <Error :error-code="outsideErrorCode" @clear="clearErrors()" />
  </main>

  <div id="spacer"></div>

  <footer>
    <a :href="config.IMPRINT_URL" target="_blank">Imprint</a>
  </footer>
</template>
