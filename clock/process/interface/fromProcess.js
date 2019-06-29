const commonMessages = require('../../../utils/commonMessages');

const types = {
  ...commonMessages.fromProcess.types,
  'POSITION': 'POSITION',
};

const creators = {
  ...commonMessages.fromProcess.creators,
  pong: (message) => ([types.PONG, { message }]),
  position: position => [types.POSITION, { position }]
};

module.exports = {
  types,
  creators,
}