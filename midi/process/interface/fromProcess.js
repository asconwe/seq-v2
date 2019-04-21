const types = {
  'PONG': 'PONG',
  'MIDI_MESSAGE': 'MIDI_MESSAGE',
};

const creators = {
  pong: (message) => ([types.PONG, { message }]),
  midiMessage: (port, message) => ([types.MIDI_MESSAGE, { port, message }])
};

module.exports = {
  types,
  creators,
}