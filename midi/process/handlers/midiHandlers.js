const emidi = require('easymidi');
const { creators } = require('../interface/fromProcess');
const { store } = require('../store');

const { midiMessage } = creators;

const handleMessage = (ipc, port, msg) => {
  const state = store.getState();
  if (state.listenersByPort[port].includes(msg.channel)) {
    ipc.server.broadcast(...midiMessage(port, msg));
  }
}

const midiHandlers = (ipc) => ({
  handleMidiMessage: (port) => {
    const handler = new emidi.Input(port);
    handler.on('noteon', (msg) => handleMessage(ipc, port, msg));
    handler.on('noteoff', (msg) => handleMessage(ipc, port, msg));
    handler.on('cc', (msg) => handleMessage(ipc, port, msg));
    handler.on('pitch', (msg) => handleMessage(ipc, port, msg));
    return handler;
  }
});

module.exports = midiHandlers;