// CoffeeOrderPage.js (React)

import React, { useState } from 'react';
import axios from 'axios';

import header from '../assets/top.png';
import Kiosk from '../assets/self-order-kiosk.png';
import strt from '../assets/order-btn.png';
import Transp from '../assets/transparent.png';
function CoffeeOrderPage() {
  const [message, setMessage] = useState('');

  // Function to order coffee
  const orderCoffee = async (coffeeType) => {
    try {
      const response = await axios.post('http://localhost:5000/order-coffee', {
        coffee: coffeeType,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error ordering coffee:', error);
      setMessage('Error placing order.');
    }
  };

  return (
    <div className='step-1'>
      <img src={header} />
      <div className='center-order'>
        <img src={Kiosk} />
              <a href='/#/menu' className=''>
        <img src={strt} />
        </a>
      </div>
        <img src={Transp} />
    </div>
  );
}

export default CoffeeOrderPage;
