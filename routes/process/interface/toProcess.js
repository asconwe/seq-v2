const types = {
  'PING': 'PING',
  'ADD_ROUTE': 'ADD_ROUTE',
  'DELETE_ROUTE': 'DELETE_ROUTE',
  'ARM_ROUTE': 'ARM_ROUTE',
  'DISARM_ROUTE': 'DISARM_ROUTE',
  'MONITOR_ROUTE': 'MONITOR_ROUTE',
  'STOP_MONITORING_ROUTE': 'STOP_MONITORING_ROUTE',
};

const creators = {
  ping: message => [types.PING, { message }],
  addRoute: (inputPort, inputChannel, outputPort, outputChannel, id) => [types.ADD_ROUTE, { inputPort, inputChannel, outputPort, outputChannel, id }],
  deleteRoute: routeId => [types.DELETE_ROUTE, { routeId }],
  armRoute: routeId => [types.ARM_ROUTE, { routeId }],
  disarmRoute: routeId => [types.DISARM_ROUTE, { routeId }],
  monitorRoute: routeId => [types.MONITOR_ROUTE, { routeId }],
  stopMonitoringRoute: routeId => [types.STOP_MONITORING_ROUTE, { routeId }],
};

module.exports = {
  types,
  creators,
}