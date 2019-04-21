const { creators } = require('./interface/toProcess');
const { types } = require('./interface/fromProcess');

const interface = require('./interface');

interface();

module.exports = {
  messageCreators: creators,
  messageTypes: types,
}