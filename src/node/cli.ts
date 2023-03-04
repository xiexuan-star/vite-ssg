import { cac } from 'cac';
import { createDevServer } from './dev';

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
  //
});

cli.parse();
