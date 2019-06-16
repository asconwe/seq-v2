const ipc = require('node-ipc');
const selectiveLogger = require('./selectiveLogger');


module.exports = (id) => {
  const capsId = id.toUpperCase().trim();
  ipc.config.id = id.trim();
  ipc.config.logger = selectiveLogger(capsId);
  ipc.config.stopRetrying = true;
  return ipc;
}