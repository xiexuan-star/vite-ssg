import { renderToString } from '@vue/server-renderer';
import { createApp } from '../theme-default/main';

module.exports = {
  renderInServer() {
    return renderToString(createApp(), {});
  }
};
