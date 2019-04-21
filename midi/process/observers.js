const emidi = require('easymidi');
const { store, selectors } = require('./store');
const observeStore = require('../../observeStore');
const midiHandlers = require('./handlers/midiHandlers');

listeners = {};

const { selectPortIds } = selectors;
const createObserver = ipc => {
  const { handleMidiMessage } = midiHandlers(ipc);
  const observeListenerPorts = observeStore(
    store,
    selectPortIds,
    (portIds) => {
      portIds.forEach(portId => {
        if (!listeners[portId]) {
          listeners[portId] = handleMidiMessage(portId)
        }
      })
      const listenersKeys = Object.keys(listeners);
      listenersKeys.forEach(key => {
        if (!portIds.includes(key)) {
          listeners[key] = null;
        }
      })
    })
}