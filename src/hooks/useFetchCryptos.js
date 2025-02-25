import { useEffect, useState } from "react";
import { fetchCryptos } from "../services/cryptoService";

export function useFetchCryptos() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getCryptos = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchCryptos(signal);
        setCryptos(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Failed to fetch cryptocurrencies.");
        }
      } finally {
        setLoading(false);
      }
    };

    getCryptos();

    return () => controller.abort(); // Cleanup to prevent memory leaks
  }, []);

  return { cryptos, loading, error };
}
