import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Typography } from '@mui/material';

function Footer() {
  return (
    <AppBar position="static" elevation={0} color="transparent">
      <Toolbar variant="dense">
        <Grid container style={{ display: 'flex', margin: 'auto' }}>
          <Typography color="#006647">
            v1.0.0
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Footer;
