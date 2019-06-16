const retry = (func, attempts = 0) => async (...args) => {
  return func(...args)
    .catch(err => new Promise((resolve, reject) => {
      if (err) console.log(err);
      setTimeout(() => {
        resolve(retry(func, attempts + 1)(...args))
      }, 500 * (attempts + 1))
    }))
}

module.exports = retry;