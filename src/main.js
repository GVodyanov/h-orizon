import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import App from './App.vue'
import router from './router'
import useMainStore from './stores/mainStore.js'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

const app = createApp(App)


app.use(PrimeVue, {
  theme: {
    preset: Aura
  },
  L,
})

app.use(createPinia())
app.use(router)

app.mount('#app')

//restore fields saved in local storage
const mainStore = useMainStore()
mainStore.restoreLocalStorage()
mainStore.setUserPosition()
