// Booking & Payment Types
export type PriceUnit = 'hour' | 'day' | 'week';

export interface Listing {
  id: string | number;
  name: string;
  price: string;
  pricePerUnit?: number; // numeric value
  unit?: PriceUnit;
  type: 'rent' | 'buy';
  image?: any;
  description?: string;
  rating?: number;
  available?: Array<{ start: string; end: string }>;
  unavailable?: Array<{ start: string; end: string }>;
}

export interface DateRange {
  start?: string; // ISO date string YYYY-MM-DD
  end?: string;
}

export interface PriceBreakdown {
  base: number;
  service: number;
  tax: number;
  deposit: number;
  total: number;
  days?: number;
  unit?: PriceUnit;
}

export interface BookingDraft {
  id?: string;
  listingId: string | number;
  listingName: string;
  dateRange: DateRange;
  priceBreakdown?: PriceBreakdown;
  status: BookingStatus;
  createdAt: string;
}

export type BookingStatus =
  | 'draft'
  | 'awaiting_payment'
  | 'confirmed'
  | 'completed'
  | 'canceled';

export interface Booking extends BookingDraft {
  id: string;
  customerId: string;
  sellerId: string;
  paymentIntentId?: string;
  status: BookingStatus;
  confirmedAt?: string;
  completedAt?: string;
}

export interface PaymentIntent {
  clientSecret: string;
  ephemeralKey?: string;
  customerId?: string;
  amount: number;
}
