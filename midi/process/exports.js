const { creators } = require('./interface/toProcess');
const { types } = require('./interface/fromProcess');

module.exports = {
  messageCreators: creators,
  messageTypes: types,
}