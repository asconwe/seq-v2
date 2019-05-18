const { createStore } = require('redux');
const types = require('./types');

const initialRouteState = {
  armed: false,
  monitoring: true,
  seqencerEnabled: false,
  inputPort: null,
  inputChannel: null,
  outputPort: null,
  outputChannel: null,
}

const routeReducer = (routeState = initialRouteState, action) => {
  switch (action.type) {
    case types.ARM_ROUTE:
      return { ...routeState, armed: true };
    case types.DISARM_ROUTE:
      return { ...routeState, armed: false };
    case types.MONITOR_ROUTE:
      return { ...routeState, monitoring: true };
    case types.STOP_MONITORING_ROUTE:
      return { ...routeState, monitoring: false };

    default:
      return routeState;
  }
}

const initialState = {
  byId: {},
  ids: [],
}

const addRoute = (state, action) => {
  const { routeId, type, ...rest } = action;
  if (!state.byId[routeId]) {
    const ids = [...state.ids, routeId];
    const byId = {
      ...state.byId,
      [routeId]: {
        ...initialRouteState,
        ...rest,
      }
    }
    return {
      byId,
      ids,
    }
  }
  return state;
}

const deleteRoute = (state, action) => {
  const { routeId } = action;
  const ids = state.ids.filter(id => id !== routeId);
  const { [routeId]: thisRoute, ...byId } = state.byId;
  return {
    byId,
    ids,
  }
}

const selectRouteReducer = (state, action) => {
  if (state.byId[action.routeId]) {
    return {
      ...state,
      byId: {
        ...state.byId,
        [action.routeId]: routeReducer(state.byId[action.routeId], action),
      }
    }
  }
  return state;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_ROUTE:
      return addRoute(state, action);
    case types.DELETE_ROUTE:
      return deleteRoute(state, action);
    default:
      return selectRouteReducer(state, action);
  }
}

const store = createStore(reducer);

module.exports = {
  store,
}