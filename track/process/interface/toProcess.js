const types = {
  'PING': 'PING',
  'WRITE_MESSAGE': 'WRITE_MESSAGE',
  'READ_MESSAGE': 'READ_MESSAGE',
}

const creators = {
  ping: message => [types.PING, { message }],
  writeMessage: message => [types.WRITE_MESSAGE, { message }]
}

module.exports = { types, creators };