const emidi = require('easymidi')
const { creators } = require('../interface/fromProcess');
const { store, actionCreators } = require('../store');
const createMidiHandlers = require('./midiHandlers');
const createIpcHandler = require('../../../utils/createIpcHandler');

const { addPortListener, removePortListener } = actionCreators;
const { midiInputs, midiOutputs } = creators;

const inputs = emidi.getInputs();
const outputs = emidi.getOutputs();

const activatedOutputs = outputs.map(outputName => new emidi.Output(outputName));

const outputsObj = outputs.reduce((obj, outputName, i) => ({
  ...obj,
  [outputName]: activatedOutputs[i],
}), {});

const messageAll = (type, data) => () => {
  activatedOutputs.forEach(output => {
    output.send(type, data);
  })
}

const ipcHandlers = (ipc) => {
  const handler = createIpcHandler(ipc);
  const { handleMidiMessage } = createMidiHandlers(ipc);

  return ({
    handleGetInputs: handler(inputs),
    handleGetOutputs: handler(outputs),
    handleMidiMessageOut: ({ port, message }) => {
      try {
        const { _type, ...data } = message;
        outputsObj[port].send(_type, data)
      } catch (error) {
        ipc.log(`== could not send midi to port ${port} due to error: ${error.message} \n ${error.stack}`);
      }
    },
    handleClockOut: messageAll('clock'),
    handleClockStart: messageAll('start'),
    handleClockStop: messageAll('stop'),
    handleClockContinue: messageAll('continue'),
    handleClockReset: messageAll('reset'),

    handlePanic: ({ port }) => {
      if (port) {
        for (i = 0; i < 16; i++) {
          for (j = 0; j < 127; j++) {
            ouputsObj[port].send('noteoff', { note: j, velocity: 0, channel: i })
          }
        }
      } else {
        activatedOutputs.forEach(output => {
          for (i = 0; i < 16; i++) {
            for (j = 0; j < 127; j++) {
              output.send('noteoff', { note: j, velocity: 0, channel: i })
            }
          }
        })
      }
    },

    handleAddPortListener: handler(({ port, channel }) => {
      const handler = handleMidiMessage(port)
      store.dispatch(addPortListener(port, channel, handler));
    }),
    handleRemovePortListener: handler(({ port, channel }) => {
      store.dispatch(removePortListener(port, channel));
    })
  })
}

module.exports = ipcHandlers;