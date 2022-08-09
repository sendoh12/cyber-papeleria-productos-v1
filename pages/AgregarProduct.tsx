import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { Loader } from "@src/componentes/loader/Loader";
import { Box, Button, Grid, styled, TextField } from "@mui/material";
import StorageIcon from "@mui/icons-material/Storage";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color: "green",
  },

  cssOutlinedInput: {
    "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline":
      {
        borderColor: "red", //default
      },
    "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
      borderColor: "blue", //hovered
    },
    "&$cssFocused $notchedOutline": {
      borderColor: "red", //focused
    },
  },
  notchedOutline: {},
  cssFocused: {},
  error: {},
  disabled: {},
});

export const CssTextField = styled(TextField)({
  "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
    borderColor: "red", //default
  },
  "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
    borderColor: "blue", //hovered
  },
  "&$cssFocused $notchedOutline": {
    borderColor: "red", //focused
  },
});

const AgregarProduct: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  return (
    <>
      <Loader activateLoader={loader} />
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          boxShadow={3}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: "90%" }}
          justifyContent="center"
        >
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
              marginLeft={3}
              spacing={1}
            >
              <h3>Agregar Producto</h3>
            </Grid>
            <Grid
              container
              item
              style={{
                width: "80%",
                textAlign: "center",
                // border: "1px solid grey",
              }}
              spacing={3}
            >
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="bPelicula"
                  label="Nombre del producto"
                  // onChange={onChangeProducto}
                  style={{ width: "100%" }}
                  color="success"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="bPelicula"
                  label="Total de productos"
                  // onChange={onChangeProducto}
                  style={{ width: "100%" }}
                  color="success"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="bPelicula"
                  label="Costo del producto"
                  // onChange={onChangeProducto}
                  style={{ width: "100%" }}
                  color="success"
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <TextField
                  id="bPelicula"
                  label="Descripcion del producto"
                  // onChange={onChangeProducto}
                  style={{ width: "100%" }}
                  color="success"
                  size="small"
                />
              </Grid>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              style={{
                textAlign: "center",
                width: "78%",
                height: "20%",
              }}
              spacing={3}
              marginTop={3}
            >
              <Button
                variant="contained"
                color="primary"
                data-testid="button-servidor"
                sx={{
                  borderRadius: "12px",
                  textTransform: "none",
                  backgroundColor: "#004400",
                  marginBottom: "2%",
                }}
              >
                <StorageIcon /> Nuevo Producto
              </Button>
            </Grid>

            <Grid
              container
              item
              style={{
                width: "90%",
                textAlign: "center",
                margin: "0 0 30px 0",
              }}
              marginTop={0}
              spacing={4}
            ></Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default AgregarProduct;
