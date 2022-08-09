import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Axios from "axios-observable";
import CardMedia from "@mui/material/CardMedia";
import Swal from "sweetalert2";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { NextPage } from "next";
import { Loader } from "@src/componentes/loader/Loader";
import { urlProductos, urlProductosPage } from "@src/utils/endpoints";
import ModalProducto from "@src/componentes/modals/ModalProducto";
import { ModelProductos } from "@src/interface/ModelProductos";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setProducto } from "@src/redux/slices/productoSlice";

const SearchProducto: NextPage = () => {
  const [productos, setProductos] = useState<ModelProductos[]>([]);
  const [searchProduct, setSearchProduct] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>();
  const [page, setPage] = React.useState(1);
  const [paramsProduct, setParamsProduct] = useState<String>();
  const dispatch = useDispatch();
  const [paginacion, setPaginacion] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    console.log("page", page);
    console.log("event", event);

    if (!searchProduct) {
      getProductosPage(value - 1);
    } else {
      buscarProducto(value - 1);
    }
  };

  const getProductosPage = (pagina: number = 0) => {
    setLoader(true);
    Axios.get(urlProductosPage + pagina).subscribe({
      next: (res) => {
        setLoader(false);
        setProductos(res.data.content);
        setTotalPage(res.data.totalPages);
        setPaginacion(true);
      },
      error: (error) => {
        setLoader(false);
        mostrarAlerta("Favor de contactar a soporte");
      },
    });
  };

  const onChangeProducto = (
    data: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { value } = data.target;
    setPage(1);
    if (value.length === 0) {
      getProductosPage(0);
      setSearchProduct(false);
    } else {
      setSearchProduct(true);
      const params = {
        nombre_producto: value.toString().toUpperCase(),
      };

      setParamsProduct(value.toString().toUpperCase());
      Axios.post(urlProductosPage + 0, params).subscribe({
        next: (res) => {
          setProductos(res.data.content);
          setTotalPage(res.data.totalPages);
        },
        error: (error) => {
          mostrarAlerta("Favor de contactar a soporte");
        },
      });
    }
  };

  const buscarProducto = (pagina: number = 0) => {
    const params = {
      nombre_producto: paramsProduct,
    };

    Axios.post(urlProductosPage + pagina, params).subscribe({
      next: (res) => {
        setProductos(res.data.content);
        setTotalPage(res.data.totalPages);
      },
      error: (error) => {
        mostrarAlerta("Favor de contactar a soporte");
      },
    });
  };

  const verDetalle = (producto: ModelProductos) => {
    Axios.get(urlProductos + producto.id_producto).subscribe({
      next: (res) => {
        console.log("datosTodos", res.data);
        dispatch(setProducto(res.data));
      },
      error: (error) => {
        mostrarAlerta("Favor de contactar a soporte");
      },
    });

    setOpenModal(true);
  };

  const cerrarModal = (status: boolean) => {
    setOpenModal(status);
  };

  const mostrarAlerta = (textError: string) => {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: textError,
    });
  };

  useEffect(() => {
    getProductosPage();
  }, []);

  return (
    <>
      <Loader activateLoader={loader} />
      <ModalProducto
        openModal={openModal}
        onClose={(status: boolean) => cerrarModal(status)}
      />
      <Box boxShadow={3} bgcolor="background.paper" m={1} p={1}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "10vh", backgroundColor: "#e2e3e5" }}
        >
          <Grid
            container
            item
            style={{ width: "80%", textAlign: "center" }}
            marginLeft={0}
            spacing={1}
          >
            <h3>Buscar Producto</h3>
          </Grid>
          <Grid
            container
            item
            style={{
              width: "80%",
              textAlign: "center",
              border: "1px solid grey",
            }}
            spacing={1}
          >
            <TextField
              id="bPelicula"
              label="Buscar producto"
              onChange={onChangeProducto}
              style={{ width: "100%" }}
              color="secondary"
              size="small"
            />
          </Grid>
          {/* {paginacion && (
            <Grid item>
              {!searchProduct && (
                <Grid item marginTop={2}>
                  <h3>Productos más nuevos</h3>
                </Grid>
              )}
            </Grid>
          )} */}

          <Grid
            container
            item
            style={{ width: "90%", textAlign: "center", margin: "0 0 30px 0" }}
            marginTop={0}
            spacing={4}
          >
            {/* {productos.map((item) => (
              // Without the `key`, React will fire a key warning
              <React.Fragment key={item.id_producto}>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={3}
                  textAlign={'center'}
                  marginTop={5}
                  style={{ height: '40vh', margin: '0 0 80px 0' }}
                >
                  <Grid item style={{ width: '90%', backgroundColor: '#ffffff', borderRadius: '10px' }}>
                    <Typography variant="caption" display="block" gutterBottom>
                      <Grid
                        item
                        style={{ height: '7vh', backgroundColor: '#104476', color: '#ffffff', borderRadius: '10px' }}
                      >
                        {item.nombre_producto}
                      </Grid>
                    </Typography>
                    <Button
                      onClick={() => {
                        verDetalle(item);
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        width="300"
                        sx={{ maxWidth: 400 }}
                        image={item.imagen_producto}
                        alt="Paella dish"
                        style={{ height: '30vh' }}
                      />
                    </Button>

                    <Grid
                      container
                      item
                      style={{ height: '3vh', textAlign: 'center', borderRadius: '10px' }}
                      spacing={1}
                    >
                      <Grid
                        item
                        md={9}
                        xs={6}
                        sm={9}
                        lg={6}
                        style={{ backgroundColor: '#1976d2', color: '#ffffff', borderRadius: '10px' }}
                      >
                        <Typography variant="caption" display="block" gutterBottom>
                          <Grid item color="#ffffff">
                            Precio: ${item.precio_producto}
                          </Grid>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ))} */}
          </Grid>
          {/* {paginacion && (
            <Stack spacing={2}>
              <Pagination
                style={{ margin: '0 0 30px 0' }}
                color="primary"
                count={totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack>
          )} */}
        </Grid>
      </Box>
    </>
  );
};

export default SearchProducto;
