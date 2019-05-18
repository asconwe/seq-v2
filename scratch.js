// let easymidi = require('easymidi');

// const inputs = easymidi.getInputs();

// console.log(inputs);

// easymidi = null;

// setTimeout(() => {
//   easymidi = require('easymidi');
//   const newInputs = easymidi.getInputs();
//   console.log(newInputs)
// }, 5000)


require('./index');
const ipc = require('./ipcSetup');

const { creators } = require('./clock/process/interface/toProcess')
const { types } = require('./clock/process/interface/fromProcess');
const { ping } = creators;
const { PONG } = types;

ipc.config.id = 'scratch';

ipc.connectTo('clock', () => {
  console.log('___ Connecting to clock ___')
  ipc.of.clock.on('connect', () => {
    console.log('::: Connected to clock :::')
    ipc.of.clock.emit(...ping('hello'))
  })
  ipc.of.clock.on(PONG, (data) => {
    console.log('RECEIVED:', data)
  })
})
