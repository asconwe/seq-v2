const { createStore } = require('redux');

const types = {
  'ADD_MIDI_LISTENER': 'ADD_MIDI_LISTENER',
  'REMOVE_MIDI_LISTENER': 'REMOVE_MIDI_LISTENER',
}

const actionCreators = {
  addMidiListener: (port, channel, socket) => ({
    type: types.ADD_MIDI_LISTENER,
    port,
    channel,
    socket,
  }),
  removeMidiListener = (port, channel) => ({
    type: types.REMOVE_MIDI_LISTENER,
    port,
    channel
  })
}

const selectors = {
  selectPortIds: state => state.listenersByPort,
}

const addMidiListener = (state, action) => {
  if (state.listenersByPort[action.port]) {
    if (
      state.listenersByPort[action.port].find(item =>
        item.channel === action.channel)
    ) {
      return state;
    }
    return {
      ...state,
      listenersByPort: {
        ...state.listenersByPort,
        [action.port]: [...state[action.port], action.channel],
      }
    }
  }
  return {
    portIds: [...state.portIds, action.port],
    listenersByPort: {
      ...state.listenersByPort,
      [action.port]: [action.channel]
    }
  }
}

const removeMidiListener = (state, action) => {
  const channels = state.listenersByPort[action.port];
  if (!channels) return state;
  const newChannels = channels.filters(channel => channel !== action.channel);
  return newChannels.length === 0
    ? ({
      portIds: state.portIds.filter(name => name === action.port),
      listenersByPort: {
        ...state.listenersByPort,
        [action.port]: null
      }
    })
    : ({
      ...state,
      listenersByPort: {
        ...state.listenersByPort,
        [action.port]: newChannels,
      }
    });
}

const initialState = {
  listenersByPort: {},
  portIds: [],
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MIDI_LISTENER:
      return addMidiListener(state, action);
    case types.REMOVE_MIDI_LISTENER:
      return removeMidiListener(state, action);
    default:
      return state;
  }
}

const store = createStore(reducer);

module.exports = {
  store,
  actionCreators,
  selectors,
}