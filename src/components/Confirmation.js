// ConfirmationPage.js (React)

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import header from '../assets/top.png';
import Logo from '../assets/cafe-logo.png';
import Place from '../assets/place-order.png';
import Cancel from '../assets/cancel.png';
import Qty from '../assets/qty.png';

const ConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState(null);
  const [milkOption, setMilkOption] = useState('');
  const [teaFlavor, setTeaFlavor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const selectedProduct = state?.selectedProduct || {};

  useEffect(() => {
    // Generate a unique order number
    const storedOrderNumber = localStorage.getItem('orderNumber') || 0;
    const nextOrderNumber = parseInt(storedOrderNumber, 10) + 1;
    setOrderNumber(nextOrderNumber.toString().padStart(3, '0'));
    localStorage.setItem('orderNumber', nextOrderNumber);
  }, []);

  // Function to place the order by calling the backend
  const placeOrder = async () => {
    // Validation: Make sure the user selects a tea flavor if the product is Tea
    if (selectedProduct.name === 'Tea' && !teaFlavor) {
      setErrorMessage('Please select a tea flavor.');
      return;
    }

    // Validation: Make sure the user selects a milk option for Cappuccino or Caffe Latte
    if (
      (selectedProduct.name === 'Cappuccino' ||
        selectedProduct.name === 'Caffe Latte') &&
      !milkOption
    ) {
      setErrorMessage('Please select a type of milk.');
      return;
    }

    const orderDetails = {
      orderNumber,
      product: selectedProduct.name,
      milkOption:
        selectedProduct.name === 'Americano' ||
        selectedProduct.name === 'Caffe Latte' ||
        selectedProduct.name === 'Cappuccino' ||
        selectedProduct.name === 'Tea'
          ? milkOption
          : null,
      teaFlavor: selectedProduct.name === 'Tea' ? teaFlavor : null,
    };

    try {
      // Send a POST request to the backend to place the order
      const response = await axios.post(
        'http://localhost:5000/order-coffee',
        orderDetails
      );
      // Redirect to the place order page after successfully placing the order
      navigate('/place-order', {
        state: { orderDetails: response.data.order },
      });
    } catch (error) {
      setErrorMessage('Failed to place the order.');
      console.error(error);
    }
  };

  return (
    <div>
      <div className='step-1'>
        <div className='center-order-menu mb-4'>
          <img src={header} alt='Header' />
          <img src={Logo} alt='Logo' />
        </div>
        <div className='menu mb-2'>
          {selectedProduct ? (
            <div>
              <div className='d-flex flex-column align-items-center gap-2'>
                <img src={selectedProduct.image} alt={selectedProduct.name} />
                <img src={Qty} />
              </div>
              {(selectedProduct.name === 'Cappuccino' ||
                selectedProduct.name === 'Caffe Latte' ||
                selectedProduct.name === 'Americano' ||
                selectedProduct.name === 'Tea') && (
                <div>
                  <h3 className='my-4 text-center'>Select Type of Milk</h3>
                  <div className='milk-options'>
                    {[
                      'Fresh Full Fat Milk',
                      'Low Fat Milk',
                      'Skimmed Milk',
                    ].map((milk) => (
                      <button
                        key={milk}
                        onClick={() => setMilkOption(milk)}
                        className={`flavor-button ${
                          milkOption === milk ? 'active' : ''
                        }`}
                      >
                        {milk}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedProduct.name === 'Tea' && (
                <div>
                  <h3 className='my-4 text-center'>Select Tea Flavor</h3>
                  <div className='tea-flavors'>
                    {[
                      'English Breakfast',
                      'Green Tea',
                      'Earl Grey',
                      'Lemon and Ginger',
                    ].map((flavor) => (
                      <button
                        key={flavor}
                        onClick={() => setTeaFlavor(flavor)}
                        className={`flavor-button ${
                          teaFlavor === flavor ? 'active' : ''
                        }`}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {errorMessage && <p className='error-message'>{errorMessage}</p>}
            </div>
          ) : (
            <p>No product selected.</p>
          )}
        </div>
        <div className='d-flex justify-content-between gap-3'>
          <a href='#' className=''>
            <img src={Cancel} alt='Cancel' />
          </a>
          <a onClick={placeOrder} className=''>
            <img src={Place} alt='Place Order' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
