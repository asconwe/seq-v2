const setupIpc = require('../../../ipcSetup');
const { types } = require('./toProcess');
const { creators } = require('./fromProcess');

const ipcHandlers = require('../handlers/ipcHandlers');

const id = process.argv[2];
const ipc = setupIpc(id);

const { pong } = creators;

const { readIndex, writeMessage } = ipcHandlers(ipc);

ipc.serve(() => {
  ipc.server.on(types.PING, (data, socket) => {
    ipc.server.emit(socket, ...pong(data.message + ` track ${id}`));
  });
  ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
    ipc.log('client ' + destroyedSocketID + ' has disconnected!');
  });

  ipc.server.on(types.READ_INDEX, readIndex);
  ipc.server.on(types.WRITE_MESSAGE, writeMessage);
});

ipc.server.start();

