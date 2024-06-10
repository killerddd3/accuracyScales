import * as AntIcon from '@ant-design/icons-vue';
import { createApp } from 'vue';
import App from './App.vue';
import './style/global.css';
import components from './components/global';
import Router from './router/index';

const app = createApp(App)
app.config.productionTip = false

// components
for (const i in components) {
  app.component(i, components[i])
}
// icon
for (const i in AntIcon) {
  const whiteList = ['createFromIconfontCN', 'getTwoToneColor', 'setTwoToneColor', 'default']
  if (!whiteList.includes(i)) {
    app.component(i, AntIcon[i])
  }
}

app.use(Router).mount('#app')
