const setupIpc = require('../../../ipcSetup');
const { types } = require('./toProcess');
const { creators } = require('./fromProcess');
const selectiveListener = require('./selectiveListener');
const createIpcHandlers = require('../handlers/ipcHandlers');
const { store } = require('../store');
const { observers } = require('../../../utils/commonStore');

const ipc = setupIpc('midi');

const { pong } = creators;

const { handleGetInputs, handleGetOutputs, handleMidiMessageOut, handleAddPortListener, handleRemovePortListener } = createIpcHandlers(ipc);

ipc.serve(() => {
  ipc.server.on(types.PING, (data, socket) => {
    const { ready } = store.getState();
    if (ready) {
      ipc.server.emit(socket, ...pong(data.message + ' connected to midi'));
    } else {
      const unsubscribeObserveIsReady = observers.observeIsReady(store, () => {
        ipc.server.emit(socket, ...pong(data.message + ' connected to midi'));
        unsubscribeObserveIsReady();
      })
    }
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

ipc.server.start();

selectiveListener(ipc);
