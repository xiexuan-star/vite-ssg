import { cac } from 'cac';
import * as path from 'path';
import { createDevServer } from './dev';
import { build } from './build';

const version = require('../../package.json').version;

const cli = cac('island').version(version).help();

cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async root => {
    const app = await createDevServer(root);
    await app.listen();
    app.printUrls();
  });

cli.command('build [root]', 'build for production').action(async root => {
  try {
    root = path.resolve(root);
    await build(root);
  } catch (e: any) {
    console.log('build error=>', e);
  }
});

cli.parse();
