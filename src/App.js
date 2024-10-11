// App.js (React)

import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import CoffeeOrderPage from './components/Order';
import BaristaPage from './components/Barista';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss'
import ConfirmationPage from './components/Confirmation';
import PlaceOrderPage from './components/PlaceOrder';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/barista' element={<BaristaPage />} />
        <Route path='/' element={<CoffeeOrderPage />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/confirmation' element={<ConfirmationPage />} />
        <Route path='/place-order' element={<PlaceOrderPage />} />
      </Routes>
    </Router>
  );
}

export default App;
