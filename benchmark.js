const R = require('rambda')
const Rx = require('./dist/')
const assert = require('assert')
const Benchmark = require('benchmark')
const benchmarks = require('beautify-benchmark')

const options = {}

const add = new Benchmark.Suite

options.add = false

if (options.add) {

}

const compose = new Benchmark.Suite

options.compose = true

if (options.compose) {
  compose.add('compose', () => {
    const result = Rx.compose(
      Rx.add(1),
      Rx.add(10)
    )(1)
    assert.ok(result === 12)
  })
  .add('Rambda.compose', () => {
    const result = R.compose(
      R.add(1),
      R.add(10)
    )(1)
    assert.ok(result === 12)
  })
  .on('cycle', event => {
    benchmarks.add(event.target)
  })
  .on('complete', () => {
    benchmarks.log()
  })
  .run()
}
