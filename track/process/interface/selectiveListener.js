const { messageTypes } = require('../../../clock/process/exports');
const handleReadIndex = require('../handlers/handleReadIndex');


module.exports = ipc => {
  const readIndex = handleReadIndex(ipc);
  ipc.of.clock.on(messageTypes.POSITION, ({ position }) => {
    readIndex({ index: position })
  });
}