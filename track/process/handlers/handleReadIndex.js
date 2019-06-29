const { messageCreators } = require('../../../midi/process/exports')
const { selectors } = require('../store');

module.exports = (ipc) => ({ index }) => {
  const state = store.getState();
  const { bypass, offset, length } = state;
  if (!bypass) {
    const offsetIndex = index + offset;
    const readIndex = offsetIndex % length;
    const messages = selectors.selectMessagesByIndex(state, readIndex);
    if (messages) {
      messages.forEach((msg) => {
        ipc.of.midi.emit(...messageCreators.midiMessageOut(port, channel, msg))
      });
    }
  }
};