const setupIpc = require('../../../ipcSetup');
const { types } = require('./toProcess');
const { creators } = require('./fromProcess');

const ipcHandlers = require('../handlers/ipcHandlers');

const id = process.argv[2];
const ipc = setupIpc(`track-${id}`);

const { pong } = creators;

// const { } = ipcHandlers(ipc);

ipc.serve(() => {
  ipc.server.on(types.PING, (data, socket) => {
    ipc.server.emit(socket, ...pong(data.message + ' clock'));
  });
  ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
    ipc.log('client ' + destroyedSocketID + ' has disconnected!');
  });
});

ipc.server.start();

console.log('track process')
