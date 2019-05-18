const { messageCreators, messageTypes } = require('../../../clock/process/exports');
const { store, selectors } = require('../store');

const { ping, start, stop, setTempo } = messageCreators;
const { POSITION, PONG } = messageTypes;

module.exports = (ipc) => {
  ipc.connectTo('clock', () => {
    ipc.of.clock.on('connect', () => {
      ipc.log('== sending ping to clock')
      ipc.of.clock.emit(...ping('midi process: connected to'))
    });
    ipc.of.clock.on('disconnect', () => {
      ipc.log('== disconnected from clock');
    });
    ipc.of.clock.on(PONG, (data) => {
      ipc.log('== PONG from clock. Message:', data.message);
    });
    ipc.of.clock.on(POSITION, ({ position }) => {
      const microposition = position % 24;
      if (microposition === 0) {
        ipc.log('==', position / 24)
      }
      const state = store.getState();
      const { handlersByPort, portIds } = state;
      portIds.forEach(port => {
        handlersByPort[port].send('clock')
      })
    })
  })
}

