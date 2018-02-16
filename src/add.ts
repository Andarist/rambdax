export type Add = (holder: number) => number

export function add(x: number): Add
export function add(x: number, y: number): number
export function add(x: number, y?: number): number

export function add(
  x: number,
  y?: number
): number | Add {
  if(y === undefined){
    return (yHolder: number): number => add(x, yHolder)
  }

  return x + y
}
