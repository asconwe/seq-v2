const types = {
  'PING': 'PING',
}

const creators = {
  ping: message => [types.ping, { message }]
}

module.exports = { types, creators };