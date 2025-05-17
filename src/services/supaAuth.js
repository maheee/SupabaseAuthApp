import { createClient } from '@supabase/supabase-js'
import { ref } from 'vue';
import validation from './validation';

let supabase = null;
let ownBaseUrl = null;
let setCookie = false;
let cookieDomain = '';

const state = ref('LOGIN');
const errorCode = ref(null);
const loading = ref(false);
const userInfo = ref(null);

const init = (_supabaseUrl, _anonKey, _ownBaseUrl, _setCookie, _cookieDomain) => {
    ownBaseUrl = _ownBaseUrl;
    setCookie = _setCookie;
    cookieDomain = _cookieDomain;
    supabase = createClient(_supabaseUrl, _anonKey);

    supabase.auth.onAuthStateChange((event, session) => {
        // console.log(event, session)

        if (session?.user?.id?.length) {
            userInfo.value = {
                id: session.user.id,
                email: session.user.email,
            };
        } else {
            userInfo.value = null;
        }

        if (setCookie) {
            if (session?.access_token?.length && session?.expires_at) {
                doSetCookie("access_token", session.access_token, session.expires_at * 1000);
            } else {
                doSetCookie("access_token", '', 0);
            }
        }
    
        if (event === 'INITIAL_SESSION') {
        } else if (event === 'SIGNED_IN') {
            state.value = 'INSIDE';

        } else if (event === 'SIGNED_OUT') {
            state.value = 'LOGIN';

        } else if (event === 'PASSWORD_RECOVERY') {
            state.value = 'PW_RECOVERY';

        } else if (event === 'TOKEN_REFRESHED') {
        } else if (event === 'USER_UPDATED') {
            state.value = 'INSIDE';
        }

        clearError();
    });
};

const doSetCookie = (cname, cvalue, expiry) => {
    const d = new Date();
    d.setTime(expiry);
    const expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=" + cookieDomain + ";path=/";
}

const handleResponse = (error, res = true) => {
    if (error) {
        errorCode.value = error.code;
        loading.value = false;
        return false;
    } else {
        errorCode.value = null;
        loading.value = false;
        return res;
    }
};

//
const clearError = async () => {
    errorCode.value = null;
};

const signIn = async (email, password) => {
    loading.value = true;

    const validationError = validation.validateEmail(email) || validation.validatePassword(password);
    if (validationError) {
        return handleResponse(validationError);
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim()
    });
    return handleResponse(error);
};

const signOut = async () => {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    return handleResponse(error);
};

const resetPassword = async (email) => {
    loading.value = true;

    const validationError = validation.validateEmail(email);
    if (validationError) {
        return handleResponse(validationError);
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: ownBaseUrl
    });
    return handleResponse(error);
};

const changePassword = async (password1, password2) => {
    loading.value = true;

    const validationError = validation.validateNewPassword(password1, password2);
    if (validationError) {
        return handleResponse(validationError);
    }

    const { data, error } = await supabase.auth.updateUser({
        password: password1.trim()
    });
    return handleResponse(error);
};

const signUp = async (email, password1, password2) => {
    loading.value = true;

    const validationError = validation.validateEmail(email) || validation.validateNewPassword(password1, password2);
    if (validationError) {
        return handleResponse(validationError);
    }

    const { data, error } = await supabase.auth.signUp({
        email: email.trim(), password: password1.trim(),
        emailRedirectTo: ownBaseUrl
    });
    return handleResponse(error);
};

//
export default {
    //
    init,
    signIn,
    signOut,
    resetPassword,
    changePassword,
    signUp,

    clearError,

    //
    state,
    errorCode,
    loading,
    userInfo,
};
