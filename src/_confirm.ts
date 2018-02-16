export function confirm<Output, Reject>(
  input: Output | Reject
) : input is Output{
  return true
}