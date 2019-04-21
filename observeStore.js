/**
 * Observe the store for particular changes
 * @param {*} store The redux store
 * @param {function} select The selector to observe
 * @param {function} onChange The change handler
 */
function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    const nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

module.exports = observeStore;