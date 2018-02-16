import { confirm } from './_confirm'

export function compose<T> (...fns: Function[]) {
  return result => {
    const list = fns.slice()

    while (list.length > 0) {
      const fn = list.pop()
      if(confirm(fn)){
        result = fn(result)
      }
    }

    return result as T
  }
}
