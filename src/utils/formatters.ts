import { CurrencyCode } from '../types/travel';

export function formatMoney(amountInr: number, currency: CurrencyCode = 'INR'): string {
  if (amountInr === 0) return 'Free';
  if (currency === 'USD') {
    const usd = Math.max(1, Math.round(amountInr / 84));
    return `$${usd.toLocaleString('en-US')}`;
  }
  return `₹${Math.round(amountInr).toLocaleString('en-IN')}`;
}
