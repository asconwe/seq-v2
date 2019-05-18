const { fork } = require('child_process');

const createTrack = (id) => fork('track/process', id);

module.exports = createTrack;