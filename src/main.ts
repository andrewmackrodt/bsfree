/* eslint-disable import/order */
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'

// global styles
import 'primeflex/primeflex.scss'
import 'primeicons/primeicons.css'
import '@scss/main.scss'

// app
import App from './App.vue'
import router from './router'

// create app instance and mount
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
