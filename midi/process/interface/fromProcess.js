const types = {
  'PONG': 'PONG',
  'MIDI_MESSAGE': 'MIDI_MESSAGE',
  'MIDI_INPUTS': 'MIDI_INPUTS',
  'MIDI_OUTPUTS': 'MIDI_OUTPUTS',
};

const creators = {
  pong: (message) => ([types.PONG, { message }]),
  midiMessage: (port, channel, message) => ([types.MIDI_MESSAGE, { port, channel, message }]),
  midiInputs: inputs => ([types.MIDI_INPUTS, { inputs }]),
  midiOutputs: outputs => ([types.MIDI_OUTPUTS, { outputs }]),
};

module.exports = {
  types,
  creators,
}