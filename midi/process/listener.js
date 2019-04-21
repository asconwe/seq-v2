const selectiveLogger = require('../../selectiveLogger');
const ipc = require('node-ipc');
const { messageCreators, messageTypes } = require('../../clock/process/exports');

const { ping, start, stop, setTempo } = messageCreators;
const { POSITION } = messageTypes;

ipc.config.logger = selectiveLogger;

setTimeout(() => {
  ipc.connectTo('clock', () => {
    ipc.of.clock.on('connect', () => {
      ipc.log('## connected to clock ##');
      ipc.of.clock.emit(...ping('midi: connected to'))
    });
    ipc.of.clock.on('disconnect', () => {
      ipc.log('disconnected from clock');
    });
    ipc.of.clock.on(messageTypes.PONG, (data) => {
      ipc.log('PONG from clock. Message:', data.message);
    });
  })

  ipc.of.clock.on(POSITION, ({ position }) => {
    const microposition = position % 24;
    if (microposition === 0) {
      ipc.log('=', position / 24)
    }
  })

}, 1000)
