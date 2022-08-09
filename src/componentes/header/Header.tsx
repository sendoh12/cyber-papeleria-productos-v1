import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import HomeIcon from "@mui/icons-material/Home";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Tab, Tabs } from "@mui/material";
import SearchProducto from "pages/SearchProduct";
import AgregarProduct from "pages/AgregarProduct";

export interface HederData {
  titleHeder: string;
}

const pages = [
  { id: 1, title: "Ver Productos" },
  { id: 2, title: "Agregar Producto" },
  { id: 3, title: "Blog" },
];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header() {
  // const { titleHeder } = props;

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [searchType, setSearchType] = useState<number>(1);

  const handleSearchTypeChange = (
    event: React.ChangeEvent<unknown>,
    newValue: number
  ) => {
    setSearchType(newValue);
  };

  const handleCloseNavMenu = (page: number) => {
    console.log("identificador", page);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#004400" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Papeleria
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {/* {pages.map((page) => (
                <MenuItem key={page.id} onClick={() => {
                  handleCloseNavMenu(page.id);
                }}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))} */}

                <Tabs
                  value={searchType}
                  onChange={handleSearchTypeChange}
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#006647",
                    },
                  }}
                >
                  <Tab
                    data-testid="cu-tab"
                    value={1}
                    label="Ver Productos"
                    style={{ padding: "12px 15px" }}
                  />
                  <Tab
                    data-testid="nombre-tab"
                    value={2}
                    label="Agregar Productos"
                    style={{ padding: "12px 15px" }}
                  />
                </Tabs>
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Papeleria
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* {pages.map((page) => (
              <Button
                key={page.id}
                onClick={() => {
                  handleCloseNavMenu(page.id);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))} */}
              <Tabs
                value={searchType}
                onChange={handleSearchTypeChange}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#ffffff",
                    color: "#ffffff",
                  },
                }}
              >
                <Tab
                  data-testid="cu-tab"
                  value={1}
                  label="Ver Productos"
                  style={{ padding: "12px 15px", color: "wheat" }}
                />
                <Tab
                  data-testid="nombre-tab"
                  value={2}
                  label="Agregar Productos"
                  style={{ padding: "12px 15px", color: "wheat" }}
                />
              </Tabs>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Grid item>
        {
          {
            1: <SearchProducto />,
            2: <AgregarProduct />,
          }[searchType]
        }
      </Grid>
    </>
  );
}

export default Header;
