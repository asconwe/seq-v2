const ipc = require('node-ipc');
const selectiveLogger = require('../../../selectiveLogger');

ipc.config.logger = selectiveLogger;

module.exports = ipc;