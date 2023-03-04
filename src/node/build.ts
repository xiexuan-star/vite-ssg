import vue from '@vitejs/plugin-vue';
import * as fs from 'fs-extra';
import * as path from 'path';
import { build as viteBuild, InlineConfig } from 'vite';
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH, SERVER_ENTRY_PATH } from './constants';
import { RollupOutput } from 'rollup';

async function bundle(root = process.cwd()) {
  function resolveViteConfig(isServer: boolean): InlineConfig {

    return {
      mode: 'production',
      root,
      plugins: [vue()],
      build: {
        outDir: isServer ? '.temp' : 'build',
        rollupOptions: {
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: {
            entryFileNames: isServer ? '[name].js' : null,
            format: isServer ? 'cjs' : 'esm'
          }
        }
      }
    };
  }

  console.log(`Building client + server bundles...`);

  // ssg core
  try {
    return Promise.all([viteBuild(resolveViteConfig(false)), viteBuild(resolveViteConfig(true))]);
  } catch (e: any) {
    console.log('build error=>', e);
  }
}

export async function build(root: string) {
  const [clientBundle] = await bundle(root) as [RollupOutput, RollupOutput];

  const serverEntryPath = path.resolve(root, '.temp', 'server-entry.js');
  const { renderInServer } = require(serverEntryPath);

  await renderPage(renderInServer, root, clientBundle);
}

async function renderPage(render: () => Promise<string>, root: string, clientBundle: RollupOutput) {
  const clientChunk = clientBundle.output.find(chunk => chunk.type === 'chunk' && chunk.isEntry);

  console.log(`Rendering page in server side...`);

  const appHtml = await render();
  let html = await fs.readFile(DEFAULT_HTML_PATH, 'utf-8');
  html = html.replace('<!--   SSR_APP   -->', appHtml).replace('</body>', `<script type="module" src="/${ clientChunk?.fileName }"></script><bo`);

  await fs.ensureDir(path.resolve(root, 'build'));
  await fs.writeFile(path.resolve(root, 'build', 'index.html'), html);
  await fs.remove(path.resolve(root, '.temp'));
}
