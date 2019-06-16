const commonMessages = require('../../../utils/commonMessages');

const types = {
  ...commonMessages.fromProcess.types,
  'MIDI_MESSAGE': 'MIDI_MESSAGE',
  'MIDI_INPUTS': 'MIDI_INPUTS',
  'MIDI_OUTPUTS': 'MIDI_OUTPUTS',
};

const creators = {
  ...commonMessages.fromProcess.creators,
  midiMessage: (port, message) => ([types.MIDI_MESSAGE, { port, channel: message.channel, message }]),
  midiInputs: inputs => ([types.MIDI_INPUTS, { inputs }]),
  midiOutputs: outputs => ([types.MIDI_OUTPUTS, { outputs }]),
};

module.exports = {
  types,
  creators,
}