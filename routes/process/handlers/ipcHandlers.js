const { store } = require('../store');
const actionCreators = require('../store/actionCreators');

const { addRoute, deleteRoute, armRoute, disarmRoute, monitorRoute, stopMonitoringRoute } = actionCreators;

const ipcHandlers = (ipc) => {
  return ({
    handleAddRoute: (routeData) => {
      store.dispatch(addRoute(routeData));
    },
    handleDeleteRoute: ({ routeId }) => {
      store.dispatch(deleteRoute(routeId))
    },
    handleArmRoute: ({ routeId }) => {
      store.dispatch(armRoute(routeId))
    },
    handleDisarmRoute: ({ routeId }) => {
      store.dispatch(disarmRoute(routeId))
    },
    handleMonitorRoute: ({ routeId }) => {
      store.dispatch(monitorRoute(routeId))
    },
    handleStopMonitoringRoute: ({ routeId }) => {
      store.dispatch(stopMonitoringRoute(routeId))
    },
  });
}

module.exports = ipcHandlers;