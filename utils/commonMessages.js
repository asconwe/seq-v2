const toProcess = {
  types: {
    'PING': 'PING',
  },
  creators: {
    ping: message => [toProcess.types.PING, { message }],
  }
}


const fromProcess = {
  types: {
    'PONG': 'PONG',
    'SUCCESS': 'SUCCESS',
  },
  creators: {
    success: (message) => ([fromProcess.types.SUCCESS], { message }),
    pong: (message) => ([fromProcess.types.PONG, { message }]),
  }
}

module.exports = { toProcess, fromProcess };