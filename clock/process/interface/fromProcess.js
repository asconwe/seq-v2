const commonMessages = require('../../../utils/commonMessages');

const types = {
  ...commonMessages.fromProcess.types,
  'MIDI_INPUTS': 'MIDI_INPUTS',
  'MIDI_OUTPUTS': 'MIDI_INPUTS',
};

const creators = {
  ...commonMessages.fromProcess.creators,
  pong: (message) => ([types.PONG, { message }]),
  midiInputs: inputs => ([types.MIDI_INPUTS, { inputs }]),
  midiOutputs: outputs => ([types.MIDI_OUTPUTS, { outputs }]),
};

module.exports = {
  types,
  creators,
}