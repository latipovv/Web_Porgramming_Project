import { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
} from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptos, setLoading, setError } from "../store/cryptosSlice";
import { addCrypto, removeCrypto } from "../store/selectedCryptosSlice";
import { CryptoPagination } from "../components/Pagination";
import { formatMarketCap } from "../utils/helper";
import { FaSearch, FaSort } from "react-icons/fa";

export default function Cryptocurrencies({ currency }) {
  const { cryptos, loading, page } = useSelector((state) => state.cryptos);
  const { selectedCryptos } = useSelector((state) => state.selectedCryptos);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState("market_cap");
  const [sortOrder, setSortOrder] = useState("desc");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchCryptos() {
      dispatch(setLoading(true));
      dispatch(setError(null));
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_${sortOrder}&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`
        );
        if (!response.ok) {
          throw new Error("Error fetching cryptocurrencies");
        }
        const fetchedCryptos = await response.json();
        dispatch(setCryptos(fetchedCryptos));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    }
    fetchCryptos();
  }, [dispatch, currency, page, sortOrder]);

  useEffect(() => {
    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
  }, [selectedCryptos]);

  const handleSelectCrypto = useCallback((crypto, selected) => {
    if (selected) {
      dispatch(removeCrypto(crypto.id));
    } else {
      dispatch(addCrypto(crypto));
    }
  }, [dispatch]);

  const isCryptoSelected = useCallback((id) => selectedCryptos.some((crypto) => crypto.id === id), [selectedCryptos]);

  const filteredCryptos = useMemo(() => cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  ), [cryptos, searchTerm]);

  return (
    <div>
      <HeroSection currency={currency} />
      <div className="max-w-[1140px] mx-auto mt-[30px] flex flex-col">
        <h1 className="text-center text-white text-[34px] font-bold">Cryptocurrency Prices</h1>
        
        <div className="flex justify-between items-center my-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Cryptocurrency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 w-full rounded border border-gray-600 bg-transparent text-white"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
            className="px-4 py-2 bg-blue-500 text-white rounded flex items-center gap-2"
          >
            <FaSort /> Sort by Market Cap
          </button>
        </div>

        <Table>
          <TableHead>
            <TableHeadCell>Coin</TableHeadCell>
            <TableHeadCell className="text-right">Price</TableHeadCell>
            <TableHeadCell className="text-right">24h Change</TableHeadCell>
            <TableHeadCell className="text-right">Market Cap</TableHeadCell>
          </TableHead>
          <TableBody>
            {filteredCryptos.map((crypto) => (
              <TableRow key={crypto.id} className="hover:bg-gray-800">
                <TableCell>
                  <Link to={`/cryptos/${crypto.id}`} className="flex items-center">
                    <img src={crypto.image} alt={crypto.name} className="w-10 h-10 mr-2" />
                    <div>
                      <h3 className="text-white font-bold uppercase">{crypto.symbol}</h3>
                      <p className="text-gray-400 text-sm">{crypto.name}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-right text-white">{crypto.current_price.toLocaleString()} {currency.toUpperCase()}</TableCell>
                <TableCell className={`text-right ${crypto.price_change_percentage_24h > 0 ? "text-green-400" : "text-red-400"}`}>{crypto.price_change_percentage_24h.toFixed(2)}%</TableCell>
                <TableCell className="text-right text-white">{formatMarketCap(crypto.market_cap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {loading && <div className="text-center text-white mt-4">Loading...</div>}
      <CryptoPagination />
    </div>
  );
}
