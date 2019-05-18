module.exports = (id) => (str) => str.startsWith('=')
  ? console.log(`${id} ${str}`)
  : null;