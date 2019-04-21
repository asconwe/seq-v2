const { store, actionCreators } = require('../store');

const { setIsPlaying, setTempo } = actionCreators;

const ipcHandlers = (clock, ipc) => ({
  handleStart: () => {
    clock.start();
    store.dispatch(setIsPlaying(true));
  },

  handleStop: () => {
    clock.stop();
    store.dispatch(setIsPlaying(false));
  },

  handleSetTempo: ({ tempo }) => {
    clock.setTempo(tempo);
    store.dispatch(setTempo(tempo));
  },
})

module.exports = ipcHandlers;