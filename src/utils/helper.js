export function formatMarketCap(marketCap) {
    if (marketCap >= 1_000_000_000) {
      return `${(marketCap / 1_000_000_000).toFixed(1)} B`;
    } else if (marketCap >= 1_000_000) {
      return `${(marketCap / 1_000_000).toFixed(1)} M`;
    }
    return marketCap.toLocaleString();
  }
 