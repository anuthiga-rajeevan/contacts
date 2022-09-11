import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

// Types
export type VariantType = 'default' | 'error' | 'success' | 'warning' | 'info';
interface Alert {
  id: string;
  type: VariantType;
  msg: string;
}

interface AlertPayload {
  type: VariantType;
  msg: string;
}

const initialState: Alert[] = [];

// Slice
const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert(state, action: PayloadAction<AlertPayload>) {
      state.push({ ...action.payload, id: uuid() });
    },
    removeAlert(state) {
      state.pop();
    },
  },
});

export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
