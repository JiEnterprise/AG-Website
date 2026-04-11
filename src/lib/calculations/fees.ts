export function calculateManagementFee(aum: number, rate = 0.01): number {
  return Math.round(aum * rate * 100) / 100
}
export function calculateTotalDue(mgmtFee: number, txFees: number): number {
  return Math.round((mgmtFee + txFees) * 100) / 100
}
