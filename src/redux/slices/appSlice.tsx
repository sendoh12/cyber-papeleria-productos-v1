import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Origen {
  pais: number;
  canal: number;
  sucursal: number;
}

interface AppState {
  isPending: boolean;
  origen: Origen;
  selectSku: string;
  isCarrito: boolean;
}

const initialState: AppState = {
  isPending: false,
  origen: {} as Origen,
  selectSku: '',
  isCarrito: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsPending: (state, action: PayloadAction<boolean>) => {
      state.isPending = action.payload;
    },
    setOrigen: (state, action: PayloadAction<Origen>) => {
      state.origen = action.payload;
    },
    setSelectSku: (state, action: PayloadAction<string>) => {
      state.selectSku = action.payload;
    },
    setIsCarrito: (state, action: PayloadAction<boolean>) => {
      state.isCarrito = action.payload;
    },
  },
});

export const {
  setIsPending, setOrigen, setSelectSku, setIsCarrito,
} = appSlice.actions;

export const selectIsPending = (state: RootState): boolean => state.app.isPending;

export const selectOrigen = (state: RootState): Origen => state.app.origen;

export const selectSku = (state: RootState): string => state.app.selectSku;

export const selectIsCarrito = (state: RootState): boolean => state.app.isCarrito;

export default appSlice.reducer;
