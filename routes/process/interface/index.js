const { types } = require('./toProcess');
const { creators } = require('./fromProcess');

const { store, actionCreators } = require('../store');

const { send } = process;
const { pong } = creators;

const interface = () => {
  process.on('message', message => {
    switch (message.type) {
      case types.PING:
        send(pong());
      default:
        break;
    }
  })
}

module.exports = interface;