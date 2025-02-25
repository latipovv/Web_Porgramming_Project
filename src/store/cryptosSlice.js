import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cryptos: [], 
   
  loading: false,
  error: null,
  page : 1,
};

const cryptosSlice = createSlice({
  name: "cryptos", 
  initialState,
  reducers: {
    setCryptos: (state, action) => { 
      state.cryptos = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setPage: (state, action) =>{
      state.page =action.payload
    }
  },
});

export default cryptosSlice.reducer;
export const {
  setCryptos, 
  setLoading,
  setError,
  
  setPage
} = cryptosSlice.actions;
