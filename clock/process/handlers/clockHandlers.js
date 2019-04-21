const { creators } = require('../interface/fromProcess');

const { position } = creators;
const clockHandlers = (clock, ipc) => ({
  handlePosition: (currentPosition) => {
    ipc.server.broadcast(...position(currentPosition));
  },
})

module.exports = clockHandlers;