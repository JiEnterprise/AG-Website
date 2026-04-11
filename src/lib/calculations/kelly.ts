export function kellyPositionSize(
  cash: number,
  fraction: number,
  price: number
): { dollars: number; shares: number } {
  const dollars = Math.round(cash * fraction * 100) / 100
  const shares = Math.floor(dollars / price)
  return { dollars, shares }
}
