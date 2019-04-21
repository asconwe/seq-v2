let easymidi = require('easymidi');

const inputs = easymidi.getInputs();

console.log(inputs);

easymidi = null;

setTimeout(() => {
  easymidi = require('easymidi');
  const newInputs = easymidi.getInputs();
  console.log(inputs)
}, 5000)