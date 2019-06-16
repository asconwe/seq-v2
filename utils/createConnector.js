const retry = require('./retry');
const commonMessages = require('./commonMessages');

const { ping } = commonMessages.toProcess.creators;
const { PONG } = commonMessages.fromProcess.types;

const createConnector = (ipc) => {
  const connect = (id) => new Promise((resolve, reject) => {
    const myId = ipc.config.id;
    ipc.log(`== attempting connection to ${id}`)
    ipc.connectTo(id, () => {
      ipc.of[id].emit(...ping(`${myId} connected to`))
      ipc.log(`== sent ping event to ${id}`)
      ipc.of[id].on(PONG, ({ message }) => {
        ipc.log(`== PONG from ${id}: ${message}`)
        resolve();
      })
      ipc.of[id].on('disconnect', () => {
        ipc.log(`== disconnected from ${id}`)
        // ipc.disconnect(id);
        reject()
      })
    })
  });
  return retry(connect);
}

module.exports = createConnector;