const types = {
  'PING': 'PING',
  'POSITION': 'POSITION',
  'START': 'START',
  'STOP': 'STOP',
  'SET_TEMPO': 'SET_TEMPO',
};
const creators = {
  ping: message => [types.PING, { message }],
  start: () => [types.START],
  stop: () => [types.STOP],
  setTempo: tempo => [types.SET_TEMPO, { tempo }],
};


module.exports = {
  types,
  creators,
}