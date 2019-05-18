const { fork } = require('child_process');

module.exports = (...args) => {
  fork('track/process', args);
} 