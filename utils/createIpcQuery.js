const uuid = require('uuid/v4');

const createIpcGet = (ipc, id) => ([type, data = {}]) => new Promise(resolve => {
  try {
    const ipcMessageId = uuid();
    ipc.of[id].on(ipcMessageId, (data) => {
      resolve(data);
    })
    ipc.of[id].emit(type, { ...data, ipcMessageId });
  } catch (error) {
    console.error(error);
  }
})

module.exports = createIpcGet;