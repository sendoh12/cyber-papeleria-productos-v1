import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModelProductos } from '@src/interface/ModelProductos';
import { PURGE } from 'redux-persist';
import type { RootState } from '../store';

interface ProductoState {
  producto: ModelProductos;
}

const initialState: ProductoState = {
  producto: {} as ModelProductos,
};

const productoSlice = createSlice({
  name: 'producto',
  initialState,
  reducers: {
    setProducto: (state, action: PayloadAction<ModelProductos>) => {
      state.producto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => initialState);
  },
});

export const { setProducto } = productoSlice.actions;

export const selectProducto = (state: RootState): ModelProductos => state.producto.producto;

export default productoSlice.reducer;
