import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CardMedia, Grid, TextField, Typography } from '@mui/material';
import SelectVariacion from './SelectVariacion';
import Axios from 'axios-observable';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { urlProductos } from '@src/utils/endpoints';
import { Loader } from '../loader/Loader';
import { useSelector } from 'react-redux';
import { selectProducto } from '@src/redux/slices/productoSlice';

export interface Content {
  openModal: boolean;
  onClose: (status: boolean) => void;
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

export default function ModalProducto(props: Content) {
  const { openModal, onClose } = props;
  const [open, setOpen] = React.useState(false);
  const [cantidad, setCantidad] = React.useState<number>(0);
  const [imagenProducto, setImagenProducto] = React.useState<string | undefined>('');
  const [bandera, setbandera] = React.useState<boolean>(true);
  const [loader, setLoader] = useState<boolean>(false);
  const isProducto = useSelector(selectProducto);

  const handleClose = () => {
    onClose(false);
    setOpen(false);
    setCantidad(0);
    setbandera(true);
  };

  const confirmarCompra = () => {
    onClose(false);
    setOpen(false);
    Swal.fire({
      title: 'Esta seguro de su compra?',
      text: 'El articulo sera enviado a su domicilio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar compra!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Compra exitosa!', 'Gracias por comprar con nosotros.', 'success');
        comprarProducto();
      }
      setCantidad(0);
      setbandera(true);
    });
  };

  const mostrarAlerta = (textError: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: textError,
    });
  };

  const comprarProducto = () => {
    console.log('totalProducto', isProducto);
    const operacion = Number(isProducto.total_producto) - Number(cantidad);

    const params = {
      total_producto: operacion,
    };
    setLoader(true);
    Axios.put(urlProductos + isProducto.id_producto, params).subscribe({
      next: (res) => {
        setLoader(false);
        setbandera(true);
      },
      error: (error) => {
        setLoader(false);
        mostrarAlerta('Favor de contactar a soporte');
      },
    });

    onClose(false);
    setOpen(false);
  };

  const validarNumeros = (value: string): boolean => {
    const regNumber = /^([0-9])*$/;
    return regNumber.test(value);
  };

  const onChangeCantidad = (data: React.ChangeEvent<HTMLInputElement>): void => {
    if (validarNumeros(data.target.value)) {
      const { id, value } = data.target;
      console.log('value', value);
      if (Number(value) <= Number(isProducto.total_producto)) {
        setCantidad(Number(data.target.value));
        setbandera(false);
      }
      if (value.length === 0) {
        setbandera(true);
      }
    }
  };

  const validarColor = (color: string | undefined) => {
    console.log('validarColor', color);
    if (color === 'Blanco') {
      setImagenProducto(isProducto.blanco_producto);
    } else if (color === 'Negro') {
      setImagenProducto(isProducto.negro_producto);
    } else if (color === 'Azul') {
      setImagenProducto(isProducto.azul_producto);
    } else if (color === 'Gris') {
      setImagenProducto(isProducto.gris_producto);
    }
  };

  useEffect(() => {
    setOpen(openModal);
    setImagenProducto(isProducto.imagen_producto);
  }, [openModal]);

  return (
    <div>
      <Loader activateLoader={loader} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        PaperProps={{
          style: { borderRadius: 12, backgroundColor: '#fff' },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ backgroundColor: '#104476', color: '#ffffff', borderRadius: '10px' }}
        >
          <Typography variant="subtitle2" gutterBottom component="div">
            <Grid container item justifyContent="center" alignItems="center" color="#ffffff">
              {isProducto.nombre_producto}
            </Grid>
          </Typography>
        </DialogTitle>

        <Grid
          container
          item
          justifyContent="center"
          alignItems="center"
          marginBottom={1}
          marginTop={1}
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)' }}
        >
          <DialogContentText id="alert-dialog-description">
            <Typography variant="caption" display="block" gutterBottom>
              {isProducto.descripcion_producto}
            </Typography>
          </DialogContentText>
        </Grid>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container spacing={1}>
              <Grid container spacing={1} justifyContent="center">
                <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}>
                  <Grid item sm={12} md={12}>
                    <CardMedia
                      component="img"
                      height="300"
                      width="250"
                      sx={{ maxWidth: 350 }}
                      image={imagenProducto}
                      alt="Paella dish"
                    />
                  </Grid>
                </Box>
              </Grid>
              <Grid item sm={6} md={6}>
                <Typography variant="caption" display="block">
                  Precio: ${isProducto.precio_producto}
                </Typography>
                <Typography variant="caption" display="block">
                  Producto: {isProducto.estado_producto}
                </Typography>
                <Typography variant="caption" display="block">
                  Total de productos: {isProducto.total_producto}
                </Typography>{' '}
                <br />
                <Grid container>
                  <Grid container item md={6} xs={12} sm={6} lg={6}>
                    <Typography variant="caption" display="block">
                      Elegir color:
                      <SelectVariacion
                        variacionProducto={isProducto.variacion_producto}
                        cambiarImagen={(color: string | undefined) => {
                          validarColor(color);
                        }}
                      />
                    </Typography>
                  </Grid>
                  <Grid container item md={6} xs={12} sm={6} lg={6}>
                    <Typography variant="body2" color="textSecondary">
                      <br />
                      <TextField
                        id="cantidad"
                        label="Cantidad"
                        onChange={onChangeCantidad}
                        value={cantidad}
                        color="secondary"
                        size="small"
                        style={{ width: '80%', height: '0.0375em' }}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              confirmarCompra();
            }}
            color="primary"
            disabled={bandera}
          >
            Aceptar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
