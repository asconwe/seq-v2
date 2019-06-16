const { store } = require('../store');
const actionCreators = require('../store/actionCreators');
const createIpcHandler = require('../../../utils/createIpcHandler');
const { addRoute, deleteRoute, armRoute, disarmRoute, monitorRoute, stopMonitoringRoute } = actionCreators;

const ipcHandlers = (ipc) => {
  const handler = createIpcHandler(ipc);

  return {
    handleAddRoute: handler((routeData) => {
      store.dispatch(addRoute(routeData));
      return routeData.id;
    }),
    handleDeleteRoute: handler(({ routeId }) => {
      store.dispatch(deleteRoute(routeId))
    }),
    handleArmRoute: handler(({ routeId }) => {
      store.dispatch(armRoute(routeId))
    }),
    handleDisarmRoute: handler(({ routeId }) => {
      store.dispatch(disarmRoute(routeId))
    }),
    handleMonitorRoute: handler(({ routeId }) => {
      store.dispatch(monitorRoute(routeId))
    }),
    handleStopMonitoringRoute: handler(({ routeId }) => {
      store.dispatch(stopMonitoringRoute(routeId))
    }),
  };
}

module.exports = ipcHandlers;