import { PriceUnit, PriceBreakdown } from '../types';

/**
 * Calculate the number of days between two ISO date strings (inclusive)
 */
export function diffDays(startISO: string, endISO: string): number {
  const start = new Date(startISO);
  const end = new Date(endISO);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Parse price string like "$10/hr" or "$45/day" into numeric value and unit
 */
export function parsePrice(priceString: string): { value: number; unit: PriceUnit } {
  // Remove $ and split by /
  const cleaned = priceString.replace('$', '').toLowerCase();
  const parts = cleaned.split('/');
  
  const value = parseFloat(parts[0]) || 0;
  let unit: PriceUnit = 'day';
  
  if (parts.length > 1) {
    const unitStr = parts[1].trim();
    if (unitStr.includes('hr') || unitStr.includes('hour')) {
      unit = 'hour';
    } else if (unitStr.includes('week')) {
      unit = 'week';
    } else {
      unit = 'day';
    }
  }
  
  return { value, unit };
}

/**
 * Compute total price breakdown for a rental period
 */
export function computeTotal(
  price: number,
  unit: PriceUnit,
  startISO: string,
  endISO: string,
  fees = { servicePct: 0.1, deposit: 50, taxPct: 0.07 }
): PriceBreakdown {
  const days = diffDays(startISO, endISO);
  
  let base = 0;
  
  switch (unit) {
    case 'day':
      base = price * days;
      break;
    case 'week':
      base = price * Math.ceil(days / 7);
      break;
    case 'hour':
      // Assume 8 hours per day for hour-based pricing
      base = price * (days * 8);
      break;
  }
  
  const service = base * fees.servicePct;
  const tax = (base + service) * fees.taxPct;
  const total = base + service + tax + fees.deposit;
  
  return {
    base: Math.round(base * 100) / 100,
    service: Math.round(service * 100) / 100,
    tax: Math.round(tax * 100) / 100,
    deposit: fees.deposit,
    total: Math.round(total * 100) / 100,
    days,
    unit,
  };
}

/**
 * Format currency
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

/**
 * Get today's date in ISO format (YYYY-MM-DD)
 */
export function getTodayISO(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

/**
 * Check if a date is in the past
 */
export function isPastDate(dateISO: string): boolean {
  const date = new Date(dateISO);
  const today = new Date(getTodayISO());
  return date < today;
}

/**
 * Validate date range
 */
export function isValidDateRange(start?: string, end?: string): boolean {
  if (!start || !end) return false;
  return new Date(end) >= new Date(start);
}
