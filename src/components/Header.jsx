import { Drawer, Sidebar } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeCrypto } from "../store/selectedCryptosSlice";
import { Link } from "react-router-dom";

export default function Header({ setCurrency, currency }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => setIsOpen(false);
  const { selectedCryptos } = useSelector((store) => store.selectedCryptos);
  const dispatch = useDispatch();

  const handleRemoveCrypto = (cryptoId) => {
    dispatch(removeCrypto(cryptoId));
  };

  return (
    <header className="max-w-[1140px] h-16 flex justify-between items-center mx-auto p-4 rounded-md bg-gray-900 shadow-lg">
      <Link to="/">
        <h1 className="text-sky-400 text-xl font-bold tracking-wide">CRYPTOFOLIO</h1>
      </Link>
      <div className="flex gap-5 items-center">
        <select
          name="currency"
          id="currency"
          className="bg-gray-800 text-white p-2 rounded-md focus:outline-none"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="usd">USD</option>
          <option value="rub">RUB</option>
          <option value="eur">EURO</option>
        </select>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-400 text-black px-5 py-2 rounded-md shadow-md uppercase font-medium hover:bg-sky-500 transition"
        >
          Watch List
        </button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} className="bg-gray-800 w-[500px] p-4">
        <Drawer.Header>
          <h2 className="text-white text-xl font-semibold">Watchlist</h2>
        </Drawer.Header>
        <Drawer.Items>
          <Sidebar className="bg-gray-800 p-2 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              {selectedCryptos.map((crypto) => (
                <div key={crypto.id} className="flex flex-col items-center bg-gray-700 p-4 rounded-xl shadow-md">
                  <img src={crypto.image} alt={crypto.name} className="w-20 h-20 object-cover mb-3" />
                  <p className="text-white font-semibold text-lg">
                    {currency === "rub" ? "₽" : currency === "usd" ? "$" : "€"} {crypto.current_price.toFixed(2)}
                  </p>
                  <button
                    className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => handleRemoveCrypto(crypto.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </header>
  );
}