export const fetchCryptos = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/");
  return res.json();
};
