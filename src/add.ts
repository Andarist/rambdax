import { confirm } from './_confirm'
export type Add = (holder: number) => number

export function add(
  x: number,
  y: number | undefined
): number | Add {
  if(y === undefined){
    return (yHolder: number): number => {

      const result = add(x, yHolder)
      if(confirm<number, Add>(result)){
        return result
      }
      return Infinity
    }
  }

  return x + y
}