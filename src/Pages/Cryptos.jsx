import { useEffect, useState } from "react";
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

const customTheme = {
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400 border-[#424242]",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body border-[#424242]",
    cell: {
      base: "border-[#424242] px-6 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
  head: {
    base: "group/head text-black text-sm font-bold font-['Montserrat'] leading-normal tracking-tight h-[56px] ",
    cell: {
      base: "px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg bg-[#87ceeb]",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-blue-50 even:bg-blue-200 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};

export default function Cryptocurrencies({currency}) {
  const { cryptos, loading, page } = useSelector((state) => state.cryptos);
  const { selectedCryptos } = useSelector((state) => state.selectedCryptos);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  

  useEffect(() => {
    async function fetchCryptos() {
      dispatch(setLoading(true));
      dispatch(setError(null));

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`,
          {}
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
  }, [dispatch, currency, page]); 

  useEffect(() => {
    localStorage.setItem("selectedCryptos", JSON.stringify(selectedCryptos));
  }, [selectedCryptos]);

  function handleSelectCrypto(crypto, selected) {
    const selectedCrypto = {
      id: crypto.id,
      name: crypto.name,
      current_price: crypto.current_price,
      market_cap: crypto.market_cap,
      symbol: crypto.symbol,
      image: crypto.image,
      price_change_percentage_24h_in_currency: crypto.price_change_percentage_24h_in_currency,
    };

    if (selected) {
      dispatch(removeCrypto(crypto.id));
    } else {
      dispatch(addCrypto(selectedCrypto));
    }
  }

  function isCryptoSelected(id) {
    return selectedCryptos.some((crypto) => crypto.id === id);
  }
  const filteredCryptos = cryptos.filter(crypto => 
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <HeroSection currency={currency}/>

      <div className="max-w-[1140px] mx-auto mt-[30px] flex flex-col">
        <h1 className="text-center text-white text-[34px] font-normal font-['Montserrat'] leading-[41.99px] tracking-tight">
          Cryptocurrency Prices by Market Cap
        </h1>

        

        <input
          type="text"
          placeholder="Search For a Crypto Currency.."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-[20px] px-[14px] bg-transparent outline-none rounded justify-center items-center inline-flex text-white/70 text-base font-normal font-['Roboto'] leading-none tracking-tight my-4"
        />
        <Table theme={customTheme}>
          <TableHead>
            <TableHeadCell className="w-[450px]">Coin</TableHeadCell>

            <TableHeadCell className="text-right">Price</TableHeadCell>
            <TableHeadCell className="text-right">24h Change</TableHeadCell>
            <TableHeadCell className="text-right">Market Cap</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {filteredCryptos.map((crypto) => {
              const selected = isCryptoSelected(crypto.id);
              return (
                <TableRow
                  key={crypto.id}
                  className="bg-transparent dark:border-gray-800 border-[#424242] dark:bg-gray-800 items-center"
                >
                  <TableCell className="whitespace-nowrap font-medium text-white">
                    <Link to={`/cryptos/${crypto.id}`}>
                      <div className="flex items-center">
                        <img
                          src={crypto.image}
                          alt={`${crypto.name} logo`}
                          className="w-[50px] h-[50px] mr-3"
                        />
                        <div>
                          <h3 className="text-white text-[22px] font-normal font-['Roboto'] uppercase leading-loose tracking-tight">
                            {crypto.symbol}
                          </h3>
                          <h4 className="text-[#a9a9a9] text-sm font-normal font-['Roboto'] leading-tight tracking-tight">
                            {crypto.name}
                          </h4>
                        </div>
                      </div>
                    </Link>
                  </TableCell>

                  <TableCell className="text-white text-right text-sm font-normal font-['Roboto'] leading-tight tracking-tight">
                    {crypto.current_price.toLocaleString()} {currency.toUpperCase()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-4">
                      <button
                        onClick={() => handleSelectCrypto(crypto, selected)}
                      >
                        {selected ? (
                          <img src="/green.png" />
                        ) : (
                          <img src="/Eye.png" />
                        )}
                      </button>
                      <p
                        className={`text-right ${
                          parseFloat(
                            crypto.price_change_percentage_24h_in_currency
                          ) > 0
                            ? "text-[#0ecb81]"
                            : "text-red-600"
                        } text-sm font-medium font-['Roboto'] leading-tight tracking-tight`}
                      >
                        {parseFloat(
                          crypto.price_change_percentage_24h_in_currency
                        ) > 0
                          ? "+"
                          : ""}
                        {parseFloat(
                          crypto.price_change_percentage_24h_in_currency
                        ).toFixed(2)}
                        %
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="text-white text-right text-sm font-normal font-['Roboto'] leading-tight tracking-tight">
                    {currency === "rub"?"₽"
                    :currency === "usd"? "$":
                    "€"}
                    {formatMarketCap(crypto.market_cap)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {loading && <div className="text-center text-white">LOADING...</div>}
      <CryptoPagination />
    </div>
  );
}
