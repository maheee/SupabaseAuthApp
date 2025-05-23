
let config = {};

const setConfig = (_config) => {
    config = _config;
};

const getConfig = () => ({...config});

export default {
    setConfig,
    getConfig
};
