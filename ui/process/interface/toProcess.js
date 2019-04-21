const types = {
  'PING': 'PING',
};
const creators = {
  ping: () => ({ type: 'PING' }),
};


module.exports = {
  types,
  creators,
}