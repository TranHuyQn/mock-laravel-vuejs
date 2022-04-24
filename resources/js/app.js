require('./bootstrap');
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import { createApp } from 'vue';
import router from './src/router';
import App from './App.vue';

import mitt from 'mitt';
const emitter = mitt();
const toastOptions = {
    // You can set your default options here
};

const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(Toast, toastOptions);
app.use(router);
app.mount('#app');
