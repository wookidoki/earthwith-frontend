import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../common/header/header.jsx';
import Navigator from '../common/navi/Navigator.jsx';
import Footer from '../common/footer/Footer.jsx';

const MainLayout = () => {
  return (
    <>
      <Header />
      
      <div className="pt-20">
        <Outlet /> 
      </div>

      <Footer />
      <Navigator />
    </>
  );
};

export default MainLayout;