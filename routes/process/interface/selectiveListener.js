const { messageCreators, messageTypes } = require('../../../midi/process/exports');
const { store, selectors } = require('../store');

const { ping, midiMessageOut } = messageCreators;
const { PONG, MIDI_MESSAGE } = messageTypes;

module.exports = (ipc) => {
  ipc.connectTo('midi', () => {
    ipc.of.midi.on('connect', () => {
      ipc.log('== sending ping to midi')
      ipc.of.midi.emit(...ping('routes process: connected to'));
    })
    ipc.of.midi.on('disconnect', (data) => {
      ipc.log('== disconnected from midi', data);
    })
    ipc.of.midi.on(PONG, (data) => {
      ipc.log('== PONG from midi. Message:', data.message);
    })
    ipc.of.midi.on(MIDI_MESSAGE, (data) => {
      const state = store.getState();
      const relevantRoutes = selectors.selectRoutesByInput(state, data.port, data.channel)
      relevantRoutes.forEach(routeId => {
        const { outputPort, outputChannel, monitoring, armed } = selectors.selectRouteById(state, routeId)
        if (monitoring) ipc.of.midi.emit(...midiMessageOut(outputPort, outputChannel, data.message))
        if (armed) console.log(data.message); // send to sequencer
      })
    })
  })
}