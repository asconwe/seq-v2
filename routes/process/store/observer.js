const observeStore = require('../../../observeStore');
const store = require('./index');
const selectors = require('./selectors');
const createTrack = rquire('../../../track');
const registeredTracks = {};

const unregisterTrack = (id) => {
  registeredTracks[id].kill();
}

const handleChange = (currentRouteIds) => {
  currentRouteIds.forEach(id => {
    if (!registeredTracks[id]) {
      return registeredTracks[id] = createTrack(id);
    }
  });
  Object.keys(registeredTracks).forEach(id => {
    if (!currentRouteIds.includes(id)) {
      unregisterTrack(id)
        .then(() => {
          delete registeredTracks[id]
        })
        .catch((err) => {
          console.log(`Failed to unregister track ${id} due to error ${err.stack}`)
        });
    }
  })
}

module.exports = () => {
  const unsubscribe = observeStore(
    store,
    selectors.selectRouteIds,
    handleChange,
  );
  return unsubscribe;
}