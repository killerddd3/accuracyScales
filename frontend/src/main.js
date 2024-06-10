import { createApp } from 'vue';
import App from './App.vue';
import './style/global.css';
import components from './components/global';
import Router from './router/index';
import 'virtual:svg-icons-register'
const app = createApp(App)
app.config.productionTip = false

// components
for (const i in components) {
  app.component(i, components[i])
}

app.use(Router).mount('#app')
