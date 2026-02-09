/**
 * Currency Service for real-time exchange rates
 * Using fawazahmed0/exchange-api (Daily updates, no API key required)
 */

export interface ExchangeRates {
    [key: string]: number;
}

const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies';

// Cache to prevent multiple fetches during a single session
let ratesCache: ExchangeRates | null = null;
let lastFetched: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function getLatestRates(base: string = 'aed'): Promise<ExchangeRates> {
    const now = Date.now();

    if (ratesCache && (now - lastFetched < CACHE_DURATION)) {
        return ratesCache;
    }

    try {
        const response = await fetch(`${BASE_URL}/${base.toLowerCase()}.json`);
        if (!response.ok) throw new Error('Failed to fetch exchange rates');

        const data = await response.json();
        const rates = data[base.toLowerCase()];

        ratesCache = rates;
        lastFetched = now;

        return rates;
    } catch (error) {
        console.error('Currency API Error:', error);
        // Fallback to approximate rates if API fails
        return {
            usd: 0.2723,
            inr: 22.65,
            pkr: 75.8,
            php: 15.35,
            gbp: 0.215,
            eur: 0.252,
        };
    }
}

export function convertCurrency(amount: number, rate: number): number {
    return amount * rate;
}
