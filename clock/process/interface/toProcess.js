const commonMessages = require('../../../utils/commonMessages');

const types = {
  ...commonMessages.toProcess.types,
  'POSITION': 'POSITION',
  'START': 'START',
  'STOP': 'STOP',
  'SET_TEMPO': 'SET_TEMPO',
};

const creators = {
  ...commonMessages.toProcess.creators,
  start: () => [types.START],
  stop: () => [types.STOP],
  setTempo: tempo => [types.SET_TEMPO, { tempo }],
};

module.exports = {
  types,
  creators,
}