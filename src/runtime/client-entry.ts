import { createApp } from 'vue';

import App from '../theme-default/App.vue';

function renderInBrowser() {
  createApp(App).mount('#app');
}

renderInBrowser();
