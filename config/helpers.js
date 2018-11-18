'use strict';

const path = require('path');

const _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);

  return path.join.apply(path, [_root].concat(args));
}
/** hash长度 */
exports.hashDigestLength = 10;
exports.root = root;
