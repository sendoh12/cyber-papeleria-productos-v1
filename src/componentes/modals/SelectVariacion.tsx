import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Axios from 'axios-observable';
import { ModelVariacion } from '../../interface/ModelVariacion';
import { urlVariaciones } from '@src/utils/endpoints';
import { useSelector } from 'react-redux';
import { selectProducto } from '@src/redux/slices/productoSlice';
import Swal from 'sweetalert2';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '5px 20px 5px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export interface Content {
  variacionProducto: number | undefined;
  cambiarImagen: (colorImagen: string | undefined) => void;
}

export default function SelectVariacion(props: Content) {
  const { variacionProducto, cambiarImagen } = props;
  const [variaciones, setVariaciones] = useState<ModelVariacion[]>([]);
  const [color, setColor] = useState<string>('');
  const isProducto = useSelector(selectProducto);

  const getVariacion = () => {
    const params = {
      producto_variacion: isProducto.variacion_producto,
    };

    Axios.post(urlVariaciones, params).subscribe({
      next: (res) => {
        setVariaciones(res.data);
        cambiarImagen(res.data[0].color_variacion);
      },
      error: (error) => {
        mostrarAlerta('Favor de contactar a soporte');
      },
    });
  };

  const mostrarAlerta = (textError: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: textError,
    });
  };

  const handleChange = (event: { target: { value: string } }) => {
    const valor = event.target.value;
    setColor(valor);
    cambiarImagen(valor);
  };

  useEffect(() => {
    if (Object.keys(isProducto).length) {
      console.log('Producto con datos');
      getVariacion();
    }
  }, [isProducto]);

  return (
    <div>
      <FormControl sx={{ minWidth: 100 }} variant="standard">
        <NativeSelect id="demo-controlled-open-select" onChange={handleChange} input={<BootstrapInput />}>
          {variaciones.map((item) => (
            <React.Fragment key={item.id_variacion}>
              <option
                value={item.color_variacion}
                onChange={() => {
                  setColor(item.color_variacion);
                }}
              >
                {item.color_variacion}
              </option>
            </React.Fragment>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
