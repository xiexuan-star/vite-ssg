import { createServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';

export async function createDevServer(root = process.cwd()) {
  return createServer({
    root,
    plugins: [pluginIndexHtml(), vue(), jsx()]
  });
}
