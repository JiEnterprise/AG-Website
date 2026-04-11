export function roundToTwo(value: number): number {
  return Number(value.toFixed(2))
}

export function formatCurrency(value: number): string {
  const normalized = roundToTwo(value)
  return normalized.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatPrice(value: number): string {
  return roundToTwo(value).toFixed(2)
}

export function formatPercent(value: number): string {
  return `${roundToTwo(value).toFixed(2)}%`
}

export function formatSignedCurrency(value: number): string {
  const abs = formatCurrency(Math.abs(value))
  return value >= 0 ? `+${abs}` : `-${abs}`
}

export function formatSignedPercent(value: number): string {
  const abs = Math.abs(roundToTwo(value)).toFixed(2)
  return `${value >= 0 ? '+' : '-'}${abs}%`
}

export function formatShares(value: number): string {
  return Math.round(value).toLocaleString('en-US')
}

export function formatDateLabel(dateIso: string): string {
  return new Date(dateIso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
