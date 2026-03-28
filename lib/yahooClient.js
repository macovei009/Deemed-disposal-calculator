import YahooFinance from "yahoo-finance2";

// v3 requires an instance
// Suppress deprecation notices and configure validation resilience
export const yahooFinance = new YahooFinance({
  suppressNotices: ['ripHistorical', 'yahooSurvey'],
  validation: {
    logErrors: process.env.DEBUG_PRICES === '1',
  },
});
