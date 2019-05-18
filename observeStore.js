/**
 * Observe the store for particular changes
 * @param {*} store The redux store
 * @param {function} select The selector to observe
 * @param {function} onChange The change handler
 */
function observeStore(store, select, onChange) {
  let currentState;

  function handleChange() {
    try {
      const nextState = JSON.stringify(select(store.getState()));
      if (nextState !== currentState) {
        let prevState;
        prevState = currentState;
        currentState = nextState;
        onChange(JSON.parse(currentState), JSON.parse(prevState));
      }
    } catch (error) {
      const err = new Error(`INVALID STATE ERROR: ${error.message}`)
      err.stack = error.stack;
      throw err;
    }
  }

  const unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
}

module.exports = observeStore;