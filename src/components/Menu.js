// Menu.js (React)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import header from '../assets/top.png';
import Logo from '../assets/cafe-logo.png';
import espresso from '../assets/espresso.png';
import espressoActive from '../assets/espresso-active.png';
import double from '../assets/double-espresso.png';
import doubleActive from '../assets/double-espresso-active.png';
import cappuc from '../assets/cappuccino.png';
import cappucActive from '../assets/cappuccino-active.png';
import latte from '../assets/cafelatte.png';
import latteActive from '../assets/cafelatte-active.png';
import tea from '../assets/tea.png';
import teaActive from '../assets/tea-active.png';
import americano from '../assets/americano.png';
import americanoActive from '../assets/americano-active.png';
import next from '../assets/next.png';
import nextActive from '../assets/Group 3.png'
const Menu = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const products = [
    { name: 'Espresso', image: espresso, activeImage: espressoActive },
    { name: 'Double Espresso', image: double, activeImage: doubleActive },
    { name: 'Americano', image: americano, activeImage: americanoActive },
    { name: 'Caffe Latte', image: latte, activeImage: latteActive },
    { name: 'Cappuccino', image: cappuc, activeImage: cappucActive },
    { name: 'Tea', image: tea, activeImage: teaActive },
  ];

  // Function to handle product selection
  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  // Function to handle the "Next" button click
  const handleNext = () => {
    if (selectedProduct) {
      // Navigate to the confirmation page with the selected product
      navigate('/confirmation', { state: { selectedProduct } });
    } else {
      alert('Please select a product.');
    }
  };

  return (
    <div className='step-1'>
      <div className='center-order-menu mb-4'>
        <img src={header} alt='Header' />
        <img src={Logo} alt='Logo' />
      </div>
      <div className='menu mb-2'>
        {products.map((product, index) => (
          <a
            key={index}
            onClick={() => handleSelectProduct(product)}
            className={
              selectedProduct?.name === product.name
                ? 'product-active'
                : 'product'
            }
          >
            <img
              src={
                selectedProduct?.name === product.name
                  ? product.activeImage
                  : product.image
              }
              alt={product.name}
            />
          </a>
        ))}
      </div>
      <a onClick={handleNext} className=' mb-4'>
        <img
          src={selectedProduct ? nextActive : next} // Change the image based on selection
          alt='Next'
        />
      </a>
    </div>
  );
};

export default Menu;
