// PlaceOrderPage.js (React)

import React from 'react';
import { useLocation } from 'react-router-dom';
import header from '../assets/top.png';
import Logo from '../assets/cafe-logo.png';
import Success from '../assets/success.png';
import Home from '../assets/home.png';

const PlaceOrderPage = () => {
  const { state } = useLocation();
  const orderDetails = state?.orderDetails || {};

  return (
    <div>
      <div className='step-1'>
        <div className='center-order-menu mb-4'>
          <img src={header} alt='Header' />
          <img src={Logo} alt='Logo' />
        </div>
        <div className='d-flex flex-column align-items-center gap-2'>
          <img src={Success} alt='Success' />
          <p className='du-token'>
            <strong>{orderDetails.orderNumber}</strong>
          </p>
          {/* {orderDetails.milkOption && (
            <p>Milk Option: {orderDetails.milkOption}</p>
          )}
          {orderDetails.teaFlavor && (
            <p>Tea Flavor: {orderDetails.teaFlavor}</p>
          )} */}
        </div>
        <a href='#'>
          <img src={Home} alt='Home' />
        </a>
      </div>
    </div>
  );
};

export default PlaceOrderPage;
