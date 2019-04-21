const ipc = require('../../../ipcSetup');

const { types } = require('./toProcess');
const { creators } = require('./fromProcess');

const ipcHandlers = require('../handlers/ipcHandlers');
const midiHandlers = require('../handlers/midiHandlers');

const { pong } = creators;

ipc.config.id = 'midi';
ipc.serve(() => {
  ipc.server.on(types.PING, (data, socket) => {
    ipc.server.emit(socket, ...pong(data.message + ' midi'));
  })
  ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
    ipc.log('client ' + destroyedSocketID + ' has disconnected!');
  })

  ipc.server.on(types.GET_INPUTS, handleGetInputs)
  ipc.server.on(types.GET_OUTPUTS, handleGetOutputs)
  ipc.server.on(types.MIDI_MESSAGE_OUT, handleMidiMessageOut);
  ipc.server.on(types.ADD_PORT_LISTENER, handleAddPortListener);
  ipc.server.on(types.REMOVE_PORT_LISTENER, handleRemovePortListener);
})

module.exports = interface;