import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia'
import AdminComponent from './components/AdminComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';

import './assets/main.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.component('admin-component', AdminComponent);
app.component('header-component', HeaderComponent);

app.mount('#app');
