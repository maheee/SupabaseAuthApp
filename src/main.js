import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import configProvider from './config';

const init = async () => {
    const configResponse = await fetch('config.json');
    const config = await configResponse.json();
    configProvider.setConfig(config);

    createApp(App).mount('#app');
};

init().then(() => {});