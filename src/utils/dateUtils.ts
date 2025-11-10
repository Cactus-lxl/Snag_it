import { DateRange } from '../types';
import { getTodayISO } from './priceCalculator';

/**
 * Build marked dates object for react-native-calendars
 * Handles selected range, disabled dates, and unavailable dates
 */
export function buildMarkedDates(
  range: DateRange,
  unavailableDates: string[] = []
): Record<string, any> {
  const marked: Record<string, any> = {};
  
  // Mark unavailable dates
  unavailableDates.forEach((date) => {
    marked[date] = {
      disabled: true,
      disableTouchEvent: true,
      color: '#E0E0E0',
      textColor: '#999',
    };
  });
  
  // Mark selected range
  if (range.start) {
    marked[range.start] = {
      ...marked[range.start],
      startingDay: true,
      color: '#C4C9A0',
      textColor: '#1A1A1A',
      selected: true,
    };
    
    if (range.end && range.end !== range.start) {
      // Mark all dates in between
      const start = new Date(range.start);
      const end = new Date(range.end);
      let current = new Date(start);
      current.setDate(current.getDate() + 1);
      
      while (current < end) {
        const dateStr = current.toISOString().split('T')[0];
        if (!marked[dateStr]?.disabled) {
          marked[dateStr] = {
            color: '#E8EAD5',
            textColor: '#1A1A1A',
          };
        }
        current.setDate(current.getDate() + 1);
      }
      
      marked[range.end] = {
        ...marked[range.end],
        endingDay: true,
        color: '#C4C9A0',
        textColor: '#1A1A1A',
        selected: true,
      };
    }
  }
  
  return marked;
}

/**
 * Check if a date is within unavailable ranges
 */
export function isDateUnavailable(
  dateISO: string,
  unavailableRanges: Array<{ start: string; end: string }>
): boolean {
  const date = new Date(dateISO);
  
  return unavailableRanges.some((range) => {
    const start = new Date(range.start);
    const end = new Date(range.end);
    return date >= start && date <= end;
  });
}

/**
 * Generate list of unavailable date strings from ranges
 */
export function generateUnavailableDates(
  unavailableRanges: Array<{ start: string; end: string }> = []
): string[] {
  const dates: string[] = [];
  
  unavailableRanges.forEach((range) => {
    const start = new Date(range.start);
    const end = new Date(range.end);
    let current = new Date(start);
    
    while (current <= end) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
  });
  
  return dates;
}

/**
 * Format date range for display
 */
export function formatDateRange(start?: string, end?: string): string {
  if (!start) return 'Select dates';
  
  const startDate = new Date(start);
  const startFormatted = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  if (!end || end === start) return startFormatted;
  
  const endDate = new Date(end);
  const endFormatted = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  
  return `${startFormatted} - ${endFormatted}`;
}
