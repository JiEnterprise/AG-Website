import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatCurrency(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(1)}K`
  }
  return `$${value.toFixed(2)}`
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

// Simulate live market price with small random walk
export function simulatePrice(base: number, volatility = 0.002): number {
  const change = (Math.random() - 0.5) * 2 * volatility * base
  return base + change
}

// Count-up animation helper
export function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}
