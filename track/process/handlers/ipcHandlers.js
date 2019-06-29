const { store, actionCreators } = require('../store');

const handleReadIndex = require('./handleReadIndex');
const ipcHandlers = (ipc) => {
  return {
    readIndex: handleReadIndex(ipc),
    writeMessage: ({ index, message }) => {
      store.dispatch(actionCreators.addMessage(index, message))
    }
  }
}

module.exports = ipcHandlers;