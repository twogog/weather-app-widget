// import './assets/main.css' can't import cause of widget
import App from './App.ce.vue'
import { defineCustomElement } from 'vue';

const weatherWidget = defineCustomElement(App);
customElements.define('weather-widget', weatherWidget);