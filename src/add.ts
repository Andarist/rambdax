export type X = (holder: number) => number

function isX(input: number | X): input is number {
  return true
}

export function add(
  x: number,
  y: number | undefined
): number | X {
  if(y === undefined){
    return (yHolder: number): number => {
      const result = add(x, yHolder)
      if(isX(result)){
        return result
      }
      return Infinity
    }
  }

  return x + y
}