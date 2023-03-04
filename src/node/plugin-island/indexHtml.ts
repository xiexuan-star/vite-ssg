import { readFile } from 'fs/promises';
import { PluginOption } from 'vite';
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH } from '../constants';

export function pluginIndexHtml(): PluginOption {
  return {
    name: 'island:index-html',
    apply: 'serve',
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              // vite的一个约定, 绝对路径添加@fs前缀
              src: `/@fs/${ CLIENT_ENTRY_PATH }`
            },
            injectTo: 'body'
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          let html = await readFile(DEFAULT_HTML_PATH, 'utf-8');

          try {
            // 执行所有插件中的html钩子, 比如vite自身的一些用于hmr的client代码
            html = await server.transformIndexHtml(req.url, html, req.originalUrl);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          } catch (e: any) {
            return next(e);
          }
        });
      };
    }
  };
}
