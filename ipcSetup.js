const ipc = require('node-ipc');
const selectiveLogger = require('./selectiveLogger');


module.exports = (id) => {
  const normalizedId = id.toUpperCase().trim();
  ipc.config.id = normalizedId;
  ipc.config.logger = selectiveLogger(normalizedId);
  return ipc;
}