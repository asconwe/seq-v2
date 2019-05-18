const emidi = require('easymidi')
const { creators } = require('../interface/fromProcess');
const { store, actionCreators } = require('../store');
const createMidiHandlers = require('./midiHandlers');

const { addMidiListener, removeMidiListener } = actionCreators;
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
  const { handleMidiMessage } = createMidiHandlers(ipc);

  return ({
    handleGetInputs: () => {
      ipc.server.broadcast(...midiInputs(inputs));
    },
    handleGetOutputs: () => {
      ipc.server.broadcast(...midiOutputs(outputs));
    },
    handleMidiMessageOut: ({ port, message }) => {
      try {
        outputsObj[port].send(message.type, message.data)
      } catch (error) {
        ipc.log(`could not send midi to port ${port} due to error: ${err.message} \n ${err.stack}`);
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

    handleAddPortListener: ({ port, channel }) => {
      const handler = handleMidiMessage(port)
      store.dispatch(addMidiListener(port, channel, handler));
    },
    handleRemovePortListener: ({ port, channel }) => {
      store.dispatch(removeMidiListener(port, channel));
    }
  })
}

module.exports = ipcHandlers;