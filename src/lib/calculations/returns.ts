export function allTimeReturn(current: number, initial: number): number {
  return Math.round((current - initial) * 100) / 100
}
export function allTimeReturnPct(current: number, initial: number): number {
  return Math.round(((current - initial) / initial) * 10000) / 100
}
