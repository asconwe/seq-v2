const createConnector = require('../../../utils/createConnector');
const { messageCreators, messageTypes } = require('../../../clock/process/exports');
const { store, selectors } = require('../store');

const commonStore = require('../../../utils/commonStore');

const { ready } = commonStore.actionCreators;

const { start, stop, setTempo } = messageCreators;
const { POSITION } = messageTypes;

module.exports = (ipc) => {
  const connect = createConnector(ipc);
  connect('clock').then(() => {
    store.dispatch(ready());
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

