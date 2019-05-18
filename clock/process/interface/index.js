const setupIpc = require('../../../ipcSetup');
const MidiClock = require('midi-clock');
const { types } = require('./toProcess');
const { creators } = require('./fromProcess');

const ipcHandlers = require('../handlers/ipcHandlers');
const clockHandlers = require('../handlers/clockHandlers');

const ipc = setupIpc('clock');

const clock = MidiClock();

const { pong } = creators;


const {
  handleSetTempo,
  handleStart,
  handleStop
} = ipcHandlers(clock, ipc);
const { handlePosition } = clockHandlers(clock, ipc);

ipc.serve(() => {
  ipc.server.on(types.PING, (data, socket) => {
    ipc.server.emit(socket, ...pong(data.message + ' clock'));
  });
  ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
    ipc.log('client ' + destroyedSocketID + ' has disconnected!');
  });

  ipc.server.on(types.START, handleStart);
  ipc.server.on(types.STOP, handleStop);
  ipc.server.on(types.SET_TEMPO, handleSetTempo)

  clock.on('position', handlePosition)
});

ipc.server.start();
