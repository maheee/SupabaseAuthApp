
const createError = (code) => {
    return { code };
};

//
const validateEmail = (email) => {
    if (!email || !email.trim().length) {
        return createError('_mail_required');
    }

    return null;
};

const validatePassword = (password) => {
    if (!password || !password.trim().length) {
        return createError('_password_required');
    }
};

const validateNewPassword = (password1, password2) => {
    if (!password1 || !password1.trim().length) {
        return createError('_password_required');
    }
    if (!password2 || !password2.trim().length) {
        return createError('_password_required');
    }
    if (password1  !== password2) {
        return createError('_password_match');
    }

    return null;
};

//
export default {
    //
    validateEmail,
    validatePassword,
    validateNewPassword,
};
