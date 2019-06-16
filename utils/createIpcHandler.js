
const createIpcHandler = ipc => {
  const tryFunc = (func, data) => {
    try {
      return func(data);
    } catch (error) {
      ipc.log('== failed to execute handler function')
      console.error(error);
      throw error
    }
  }
  const handler = (func) => async ({ ipcMessageId, ...data }) => {
    const result = typeof func === 'function'
      ? await tryFunc(func, data)
      : func;
    if (!ipcMessageId) throw new Error(`No ipcMessageId in ${JSON.stringify(data)}`)
    ipc.server.broadcast(ipcMessageId, result);
  }

  return handler;
}

module.exports = createIpcHandler;