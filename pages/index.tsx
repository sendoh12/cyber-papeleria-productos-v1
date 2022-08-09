import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { Loader } from '@src/componentes/loader/Loader';
import SearchProducto from './SearchProduct';
import Header from '@src/componentes/header/Header';

const Home: NextPage = () => {
  const [loader, setLoader] = useState<boolean>(false);

  const activeWelcome = () => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 300);
  };

  useEffect(() => {
    activeWelcome();
  }, []);

  return (
    <div data-testid="home">
      <Loader activateLoader={loader} />
      {/* <Header /> */}
    </div>
  );
};

export default Home;
