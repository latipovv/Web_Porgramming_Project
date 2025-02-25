import { configureStore } from "@reduxjs/toolkit";
import cryptosSlice from "./cryptosSlice"; 
import selectedCryptosSlice from "./selectedCryptosSlice"; 

export default configureStore({
  reducer: {
    cryptos: cryptosSlice, 
    selectedCryptos: selectedCryptosSlice, 
  },
});
