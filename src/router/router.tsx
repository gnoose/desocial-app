import * as React from "react";
import { Route, Routes } from 'react-router-dom';

import Home from '../components/home';
import Layout from '../components/layout';

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="collections" element={<Home/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
