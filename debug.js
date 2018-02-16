const R = require('./dist/')

const composed = R.compose(
  R.add(1),
  R.add(10)
)(1)

console.log(composed);