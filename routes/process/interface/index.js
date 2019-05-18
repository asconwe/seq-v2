const setupIpc = require('../../../ipcSetup');

const { types } = require('./toProcess');
const { creators } = require('./fromProcess');

const ipcHandlers = require('../handlers/ipcHandlers');

const { pong } = creators;

const ipc = setupIpc('routes');

// const { } = ipcHandlers;


ipc.serve(() => {
  ipc.server.on(types.PING, (data, socket) => {
    ipc.server.emit(socket, ...pong(data.message + ' midi'));
  })
  ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
    ipc.log('client ' + destroyedSocketID + ' has disconnected!');
  })

  ipc.server.on(types.ADD_ROUTE, handleAddRoute)
  ipc.server.on(types.DELETE_ROUTE, handleDeleteRoute)
  ipc.server.on(types.ARM_ROUTE, handleArmRoute)
  ipc.server.on(types.DISARM_ROUTE, handleDisarmRoute)
  ipc.server.on(types.MONITOR_ROUTE, handleMonitorRoute)
  ipc.server.on(types.STOP_MONITORING_ROUTE, handleStopMonitoringRoute)
})

module.exports = { ipc };