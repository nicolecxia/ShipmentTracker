import { createSlice } from '@reduxjs/toolkit';

interface Carrier {
  id: number;
  name: string;
}

interface CarriersState {
  data: Carrier[];
}

const initialState: CarriersState = {
  data: [],
};

const carriersSlice = createSlice({
  name: 'carriers',
  initialState,
  reducers: {
    setCarriers: (state, action) => {
      state.data = action.payload; 
    },
  },
});

export const { setCarriers } = carriersSlice.actions;
export default carriersSlice.reducer;