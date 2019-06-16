const createConnector = require('../../../utils/createConnector');
const { messageCreators, messageTypes } = require('../../../midi/process/exports');
const { store } = require('../store');
const selectors = require('../store/selectors');
const commonStore = require('../../../utils/commonStore');

const { ready } = commonStore.actionCreators;

const { ping, midiMessageOut } = messageCreators;
const { PONG, MIDI_MESSAGE } = messageTypes;

module.exports = (ipc) => {
  const connect = createConnector(ipc);
  connect('midi').then(() => {
    store.dispatch(ready());
    ipc.of.midi.on(MIDI_MESSAGE, (data) => {
      try {
        const state = store.getState();
        const relevantRoutes = selectors.selectRoutesByInput(state, data.port, data.channel)
        relevantRoutes.forEach(routeId => {
          const { outputPort, outputChannel, monitoring, armed } = selectors.selectRouteById(state, routeId)
          if (monitoring) {
            ipc.of.midi.emit(...midiMessageOut(outputPort, outputChannel, data.message))
          }
          if (armed) console.log(data.message); // send to sequencer
        })
      } catch (error) {
        ipc.log('== error broadcasting midi message', data)
        console.error(error);
      }
    })
  })
}