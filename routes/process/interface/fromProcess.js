const types = {
  'PONG': 'PONG',
};

const creators = {
  pong: (message) => ([types.PONG, { message }]),
};


module.exports = {
  types,
  creators,
}