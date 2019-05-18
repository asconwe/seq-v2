const { createSelector } = require('reselect');

const selectRouteById = (state, id) => state.byId[id];
const selectRouteIds = state.ids;

const memoized = {}
const selectRoutesByInput = (state, inputPort, inputChannel) => {
  const routeStr = `${inputPort}${inputChannel}`;
  if (memoized[routeStr]) return memoized[routeStr](state);
  const selector = createSelector(
    selectRouteIds,
    selectRoutesById,
    (routeIds, routes) => routeIds.reduce((arr, id) => {
      if (routes[id].inputPort === inputPort && routes[id].inputChannel === inputChannel) {
        return [...arr, id]
      }
      return arr;
    }, [])
  )
  memoized[routeStr] = selector;
  return selector(state);
}

module.exports = {
  selectRouteById,
  selectRouteIds,
  selectRoutesByInput
}