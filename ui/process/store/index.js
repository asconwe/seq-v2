const { createStore } = require('redux');

const types = {

}

const actionCreators = {

}

const selectors = {

}

const initialState = {}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case default:
      return state;
  }
}

const store = createStore(reducer);

module.exports = {
  store,
  actionCreators,
}