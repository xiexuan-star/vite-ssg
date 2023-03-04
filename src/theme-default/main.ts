import { createSSRApp } from 'vue';

import App from '../theme-default/App.vue';

export function createApp() {
  return createSSRApp(App);
}
