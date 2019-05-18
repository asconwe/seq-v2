const types = {
  'PING': 'PING',
  'GET_INPUTS': 'GET_INPUTS',
  'GET_OUTPUTS': 'GET_OUTPUTS',
  'ADD_PORT_LISTENER': 'ADD_PORT_LISTENER',
  'REMOVE_PORT_LISTENER': 'REMOVE_PORT_LISTENER',
  'MIDI_MESSAGE_OUT': 'MIDI_MESSAGE_OUT',
};

const creators = {
  ping: message => [types.PING, { message }],
  getInputs: () => [types.GET_INPUTS],
  getOutputs: () => [types.GET_OUTPUTS],
  addPortListener: port => [types.ADD_PORT_LISTENER, { port }],
  addPortListener: port => [types.REMOVE_PORT_LISTENER, { port }],
  midiMessageOut: (port, channel, message) => [types.MIDI_MESSAGE_OUT, { port, channel, message }]
};

module.exports = {
  types,
  creators,
};