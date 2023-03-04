import * as path from 'path';

export const PKG_ROOT = path.resolve(__dirname, '..', '..');
export const DEFAULT_HTML_PATH = path.resolve(PKG_ROOT, 'template.html');

export const CLIENT_ENTRY_PATH = path.resolve(PKG_ROOT, 'src', 'runtime', 'client-entry.ts');
export const SERVER_ENTRY_PATH = path.resolve(PKG_ROOT, 'src', 'runtime', 'server-entry.ts');
