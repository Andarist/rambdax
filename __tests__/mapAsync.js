const R = require('../rambdax')

const delay = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a + 20)
  }, 100)
})
const fn = a => new Promise(resolve => {
  setTimeout(() => {
    if (a.length === undefined) {
      return resolve(typeof a)
    }
    resolve(a.length)
  }, 100)
})

const tap = a => new Promise(resolve => {
  setTimeout(() => {
    resolve(a)
  }, 100)
})

const rejectDelay = a => new Promise((_, reject) => {
  setTimeout(() => {
    reject(a + 20)
  }, 100)
})

test('', async () => {
  const result = await R.mapAsync(delay, [ 1, 2, 3 ])
  expect(result).toEqual([ 21, 22, 23 ])
})

test('with object', async () => {
  const result = await R.mapAsync(delay, {a: 1, b: 2, c: 3})
  expect(result).toEqual({"a": 21, "b": 22, "c": 23})
})

test('composeAsync', async () => {
  const result = await R.composeAsync(
    R.mapAsync(delay),
    R.mapAsync(async a => delay(a)),
    R.map(a => a * 10)
  )(await tap([ 1, 2, 3 ]))
  expect(result).toEqual([ 50, 60, 70 ])
})

test('error', async () => {
  try {
    const result = await R.mapAsync(rejectDelay)([ 1, 2, 3 ])
  } catch (err) {
    expect(err).toBe(21)
  }
})
