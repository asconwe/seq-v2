const setupIpc = require('../../../ipcSetup');
const { types } = require('./toProcess');
const { creators } = require('./fromProcess');
const selectiveListener = require('./selectiveListener');
const createIpcHandlers = require('../handlers/ipcHandlers');
const { store } = require('../store');
const { observers } = require('../../../utils/commonStore');
const routesObserver = require('../store/observer');

const ipc = setupIpc('routes');

const { pong } = creators;

const { handleAddRoute, handleDeleteRoute, handleArmRoute, handleDisarmRoute, handleMonitorRoute, handleStopMonitoringRoute } = createIpcHandlers(ipc);


ipc.serve(() => {
  ipc.server.on(types.PING, (data, socket) => {
    const { ready } = store.getState();
    if (ready) {
      ipc.server.emit(socket, ...pong(data.message + ' connected to routes'));
    } else {
      const unsubscribeObserveIsReady = observers.observeIsReady(store, () => {
        ipc.server.emit(socket, ...pong(data.message + ' connected to routes'));
        unsubscribeObserveIsReady();
      })
    }
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

ipc.server.start();

selectiveListener(ipc);

routesObserver(ipc);


