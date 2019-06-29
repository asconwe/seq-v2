const { createStore } = require('redux')

const types = {
  'ADD_MESSAGE': 'ADD_MESSAGE',
  'DELETE_MESSAGE': 'DELETE_MESSAGE',
  'CLEAR_TRACK': 'CLEAR_TRACK',
}

const addMessage = (index, newMessage) => ({
  type: types.ADD_MESSAGE,
  index,
  newMessage,
})

const clearTrack = () => ({
  type: types.CLEAR_TRACK
})

const actionCreators = {
  addMessage,
  clearTrack,
}

initialState = {
  writeQuantization: 0,
  readQuantization: 0,
  offset: 0,
  bypass: false,
  length: 24 * 4 * 8, // 8 measures
  messages: {}
}

const selectMessages = state => state.messages;
const selectReadQuantization = state => state.readQuantization;
const selectWriteQuantization = state => state.writeQuantization;
const selectOffset = state => state.offset;
const selectBypass = state => state.bypass;

const selectMessagesByIndex = (state, index) => state.messages[index];

const selectors = {
  selectMessages,
  selectReadQuantization,
  selectWriteQuantization,
  selectOffset,
  selectBypass,
  selectMessagesByIndex,
}

const addMessageToState = (messages, action) => {
  const prevMessages = messages[action.index] || [];
  return {
    ...messages,
    [action.index]: [
      action.newMessage,
      ...prevMessages,
    ]
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_MESSAGE:
      return {
        ...state,
        messages: addMessageToState(state.messages, action),
      }
    case types.CLEAR_TRACK:
      return {
        ...state,
        messages: {},
      }
    default:
      return state;
  }
}

const store = createStore(reducer);

module.exports = {
  store,
  selectors,
  actionCreators,
}