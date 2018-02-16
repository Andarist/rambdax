import { confirm } from './internals/_confirm'

export function compose<T> (...fns: Function[]) {
  return result => {
    const list = fns.slice()

    while (list.length > 0) {
      const fn = list.pop()
      if(confirm<Function, undefined>(fn)){
        result = fn(result)
      }
    }

    return result as T
  }
}
