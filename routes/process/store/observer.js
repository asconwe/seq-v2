const observeStore = require('../../../observeStore');
const { store } = require('./index');
const selectors = require('./selectors');
const createTrack = require('../../../track');
const createIpcQuery = require('../../../utils/createIpcQuery');
const { messageCreators } = require('../../../midi/process/exports')

const registeredTracks = {};
const unregisterTrack = (id) => {
  registeredTracks[id].kill();
}

const handleRouteIdsChange = (currentRouteIds) => {
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

const handleRoutesChange = (ipc) => {
  const midiIpcQuery = createIpcQuery(ipc, 'midi');

  return (currentRoutes, prevRoutes) => {
    const prevRoutesExist = prevRoutes.ids && prevRoutes.ids.length > 0;
    if (prevRoutesExist) {
      const newRouteIds = currentRoutes.ids.filter(id => !prevRoutes.byId[id]);
      newRouteIds.forEach(id => {
        midiIpcQuery(messageCreators.addPortListener(
          currentRoutes.byId[id].inputPort,
          currentRoutes.byId[id].inputChannel,
        ))
      })

      const deletedRoutesIds = prevRoutes.ids.filter(id => !currentRotues.byId[id]);
      deletedRoutesIds.forEach(id => {
        midiIpcQuery(messageCreators.removePortListener(
          prevRoutes.byId[id].inputPort,
          prevRoutes.byId[id].inputChannel,
        ))
      })
    } else {
      currentRoutes.ids.forEach(id => {
        midiIpcQuery(messageCreators.addPortListener(
          currentRoutes.byId[id].inputPort,
          currentRoutes.byId[id].inputChannel,
        ))
      });
    }
  }
}

module.exports = (ipc) => {
  const observers = [
    // observeStore(
    //   store,
    //   selectors.selectRouteIds,
    //   handleRouteIdsChange,
    // ),
    observeStore(
      store,
      selectors.selectRoutesAndIds,
      handleRoutesChange(ipc),
    ),
  ];
}