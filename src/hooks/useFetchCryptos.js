import { useEffect, useState } from "react";
import { fetchCryptos } from "../services/cryptoService";

export function useFetchCryptos() {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptos().then((data) => {
      setCryptos(data);
      setLoading(false);
    });
  }, []);

  return { cryptos, loading };
}
