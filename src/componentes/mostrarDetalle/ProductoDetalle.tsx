import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ModelProductos } from '../../interface/ModelProductos';
import { Box, CardMedia, Grid, TextField, Typography } from '@mui/material';
import Axios from 'axios-observable';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { urlProductos } from '@src/utils/endpoints';
import { Loader } from '../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducto } from '@src/redux/slices/productoSlice';

export interface Content {
  //   openModal: boolean;
  //   onClose: (status: boolean) => void;
  productoModal: ModelProductos | undefined;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CssTextField = styled(TextField)({
  '&.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
    height: '0.0375em',
  },
});

function ProductoDetalle() {
  const [open, setOpen] = React.useState(false);
  const [cantidad, setCantidad] = React.useState<number>(0);
  const [imagenProducto, setImagenProducto] = React.useState<string | undefined>('');
  const [bandera, setbandera] = React.useState<boolean>(true);
  const [cantidadProduct, setCantidadProduct] = React.useState<number | undefined>();
  const [loader, setLoader] = useState<boolean>(false);
  const isProducto = useSelector(selectProducto);

  return (
    <div>
      <Loader activateLoader={loader} />
      <Grid container>
        <Grid container item md={6} justifyContent="center" alignItems="center">
          <CardMedia
            component="img"
            height="400"
            width="350"
            sx={{ maxWidth: 400 }}
            image={isProducto.imagen_producto}
            alt="Paella dish"
          />
        </Grid>
        <Grid item md={6}>
          <h1>hola mundo</h1>
          <h2>{isProducto.descripcion_producto}</h2>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProductoDetalle;
