const observeStore = require('../observeStore.js');

const types = {
  READY: "READY",
}

const actionCreators = {
  ready: () => ({
    type: types.READY,
  })
}

const reducerWrapper = (reducer, initialState) => {
  return (state = initialState, action) => {
    if (action.type === types.READY) {
      return {
        ...state,
        ready: true,
      }
    }
    return reducer(state, action);
  }
}

const observers = {
  observeIsReady: (store, onIsReady) => {
    return observeStore(
      store,
      state => state.ready,
      (ready) => {
        if (ready) onIsReady();
      }
    )
  }
}

module.exports = {
  types,
  actionCreators,
  reducerWrapper,
  observers,
}