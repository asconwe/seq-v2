const types = require('./types');

const addRoute = ({ inputPort, inputChannel, outputPort, outputChannel, id }) => ({
  type: types.ADD_ROUTE,
  inputPort,
  inputChannel,
  outputPort,
  outputChannel,
  id,
})

const deleteRoute = routeId => ({
  type: types.DELETE_ROUTE,
  routeId,
})

const enableSequencer = routeId => ({
  type: types.ENABLE_SEQUENCER,
  routeId,
})

const armRoute = routeId => ({
  type: types.ARM_ROUTE,
  routeId,
})

const disarmRoute = routeId => ({
  type: types.DISARM_ROUTE,
  routeId,
})

const monitorRoute = routeId => ({
  type: types.MONITOR_ROUTE,
  routeId,
})

const stopMonitoringRoute = routeId => ({
  type: types.STOP_MONITORING_ROUTE,
  routeId,
})

module.exports = {
  addRoute,
  deleteRoute,
  enableSequencer,
  armRoute,
  disarmRoute,
  monitorRoute,
  stopMonitoringRoute,
}