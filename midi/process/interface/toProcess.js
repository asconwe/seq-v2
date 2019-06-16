const commonMessages = require('../../../utils/commonMessages');

const types = {
  ...commonMessages.toProcess.types,
  'GET_INPUTS': 'GET_INPUTS',
  'GET_OUTPUTS': 'GET_OUTPUTS',
  'ADD_PORT_LISTENER': 'ADD_PORT_LISTENER',
  'REMOVE_PORT_LISTENER': 'REMOVE_PORT_LISTENER',
  'MIDI_MESSAGE_OUT': 'MIDI_MESSAGE_OUT',
};

const creators = {
  ...commonMessages.toProcess.creators,
  getInputs: () => [types.GET_INPUTS],
  getOutputs: () => [types.GET_OUTPUTS],
  addPortListener: (port, channel) => [types.ADD_PORT_LISTENER, { port, channel }],
  removePortListener: (port, channel) => [types.REMOVE_PORT_LISTENER, { port, channel }],
  midiMessageOut: (port, channel, message) => [types.MIDI_MESSAGE_OUT, { port, message: { ...message, channel } }]
};

module.exports = {
  types,
  creators,
};