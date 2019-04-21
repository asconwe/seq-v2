const { createStore } = require('redux');

const types = {
  SET_TEMPO: 'SET_TEMPO',
  SET_IS_PLAYING: 'SET_IS_PLAYING',
}

const actionCreators = {
  setTempo: (tempo) => ({
    type: types.SET_TEMPO,
    tempo
  }),
  setIsPlaying: playing => ({
    type: types.SET_IS_PLAYING,
    playing,
  })
}

const initialState = {
  tempo: 120,
  playing: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_TEMPO:
      return { ...state, tempo: action.tempo }
    case types.SET_IS_PLAYING:
      return { ...state, playing: action.playing }
    default:
      return state;
  }
}

const store = createStore(reducer);

module.exports = {
  store,
  actionCreators,
}