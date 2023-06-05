import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap/dist/js/bootstrap'
import icons from 'bootstrap-icons/font/bootstrap-icons.css'
import './css/app.css';
import './services/firebase.js';
import './services/firestore.js';

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";

const app = createApp(App);

app.use(router);
app.use(bootstrap);
app.use(icons);
app.mount('#app');