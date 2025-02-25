import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header";
import Cryptocurrencies from "./pages/Cryptos";
import SingleCrypto from "./pages/SingleCrypto";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("usd");

  return (
    <div className="bg-[#14161A] min-h-screen">
      <Router>
        <Header setIsOpen={setIsOpen} setCurrency={setCurrency} currency={currency} />
        <Routes>
          <Route 
            path="/" 
            exact 
            element={<Cryptocurrencies isOpen={isOpen} setIsOpen={setIsOpen} currency={currency} />} 
          />
          <Route 
            path="cryptos/:id" 
            element={<SingleCrypto currency={currency} />} 
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
