const { createStore } = require('redux');
const { reducerWrapper } = require('../../../utils/commonStore');

const types = {
  'ADD_PORT_LISTENER': 'ADD_PORT_LISTENER',
  'REMOVE_PORT_LISTENER': 'REMOVE_PORT_LISTENER',
}

const actionCreators = {
  addPortListener: (port, channel, socket) => ({
    type: types.ADD_PORT_LISTENER,
    port,
    channel,
    socket,
  }),
  removePortListener: (port, channel) => ({
    type: types.REMOVE_PORT_LISTENER,
    port,
    channel
  })
}

const selectors = {
  selectPortIds: state => state.portIds,
  selectPortListeners: state => state.handlersByPort,
}

const addPortListener = (state, action) => {
  if (state.handlersByPort[action.port]) {
    if (
      state.handlersByPort[action.port].find(item =>
        item.channel === action.channel)
    ) {
      return state;
    }
    return {
      ...state,
      handlersByPort: {
        ...state.handlersByPort,
        [action.port]: [...state[action.port], action.channel],
      }
    }
  }
  return {
    ...state,
    portIds: [...state.portIds, action.port],
    handlersByPort: {
      ...state.handlersByPort,
      [action.port]: [action.channel]
    }
  }
}

const removePortListener = (state, action) => {
  const channels = state.handlersByPort[action.port];
  if (!channels) return state;
  const newChannels = channels.filters(channel => channel !== action.channel);
  return newChannels.length === 0
    ? ({
      ...state,
      portIds: state.portIds.filter(name => name === action.port),
      handlersByPort: {
        ...state.handlersByPort,
        [action.port]: null
      }
    })
    : ({
      ...state,
      handlersByPort: {
        ...state.handlersByPort,
        [action.port]: newChannels,
      }
    });
}

const initialState = {
  handlersByPort: {},
  portIds: [],
  ready: false,
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PORT_LISTENER:
      return addPortListener(state, action);
    case types.REMOVE_PORT_LISTENER:
      return removePortListener(state, action);
    default:
      return state;
  }
}

const store = createStore(reducerWrapper(reducer));

module.exports = {
  store,
  actionCreators,
  selectors,
}