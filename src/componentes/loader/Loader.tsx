import React from 'react';
import { Backdrop, Grid } from '@mui/material';
import Lottie from 'react-lottie-player';
import loadingAnimation from './loading_animation.json';

export interface LoaderDate {
  activateLoader: boolean;
}

export function Loader(props: LoaderDate) {
  const { activateLoader } = props;
  return (
    <Grid container data-testid="loader" className={activateLoader ? '' : 'off'}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={activateLoader}>
        <Lottie loop animationData={loadingAnimation} play style={{ height: '100vh', width: '100vh' }} />
      </Backdrop>
    </Grid>
  );
}
