const { prompt } = require('inquirer');
const uuid = require('uuid/v4');
const createConnector = require('../utils/createConnector');
require('../index');
const setupIpc = require('../ipcSetup');
const createIpcQuery = require('../utils/createIpcQuery');
const midi = require('../midi/process/exports')
const routes = require('../routes/process/exports');

const { getInputs, getOutputs } = midi.messageCreators;
const { MIDI_INPUTS, MIDI_OUTPUTS } = midi.messageTypes;

const { addRoute, monitorRoute } = routes.messageCreators;
const { SUCCESS } = routes.messageTypes;

const connectionIds = ['clock', 'midi', 'routes'];

const ipc = setupIpc('cli');

const midiQuery = createIpcQuery(ipc, 'midi');
const routeQuery = createIpcQuery(ipc, 'routes');

const connect = createConnector(ipc);

const midiChannels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const getUserRoutes = async (prevRoutes = []) => {
  const [inputs, outputs] = await Promise.all([
    midiQuery(getInputs()),
    midiQuery(getOutputs()),
  ]);

  const { another, ...route } = await prompt([{
    name: 'input_port',
    message: 'Choose an input port',
    type: 'list',
    choices: inputs
  }, {
    name: 'input_channel',
    message: 'Choose an input channel',
    type: 'list',
    choices: midiChannels,
  }, {
    name: 'output_port',
    message: 'Choose an output port',
    type: 'list',
    choices: outputs
  }, {
    name: 'output_channel',
    message: 'Choose an output channel',
    type: 'list',
    choices: midiChannels,
  }, {
    name: 'another',
    message: 'Make another route?',
    type: 'list',
    choices: [{ name: 'yes', value: true }, { name: 'no', value: false }]
  }])

  if (!another) return prevRoutes.concat(route);
  return getUserRoutes(prevRoutes.concat(route));
}

const main = async () => {
  try {

    await Promise.all(connectionIds.map(id => connect(id)))
    ipc.log('== Connections Initialized')

    const routes = await getUserRoutes();
    await Promise.all(routes.map(async route => {
      let routeId
      try {
        routeId = await routeQuery(addRoute(
          route.input_port,
          route.input_channel,
          route.output_port,
          route.output_channel,
          uuid(),
        ));
      } catch (error) {
        ipc.error("== Failed to add route", route);
        throw error
      }
      try {
        await routeQuery(monitorRoute(routeId));
      } catch (error) {
        ipc.error("== Failed to monitor route ")
        throw error;
      }
    }))

  } catch (error) {
    console.error(error);
  }
}

main();