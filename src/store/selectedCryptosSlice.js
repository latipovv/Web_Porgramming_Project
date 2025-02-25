import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCryptos: JSON.parse(localStorage.getItem("selectedCryptos")) || [] 
};

const selectedCryptosSlice = createSlice({
  name: 'selectedCryptos', 
  initialState,
  reducers: {

    addCrypto: (state, action) => { 
      const newCrypto = action.payload;
      
      const exists = state.selectedCryptos.find(
        (crypto) => crypto.id === newCrypto.id 
      );
      if (!exists) {
        state.selectedCryptos.push(newCrypto);
      }
    },

    removeCrypto: (state, action) => { 
      const cryptoId = action.payload;
      state.selectedCryptos = state.selectedCryptos.filter(
        (crypto) => crypto.id !== cryptoId 
      );
    },
  },
});


export const { addCrypto, removeCrypto } = selectedCryptosSlice.actions; 


export default selectedCryptosSlice.reducer;
