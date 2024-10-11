// BaristaPage.js (React)

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import header from '../assets/top.png';
import Kiosk from '../assets/self-order-kiosk.png';

const BaristaPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  // Function to fetch pending orders
  const fetchPendingOrders = async () => {
    try {
      const response = await axios.get(
        'http://localhost:5000/get-pending-orders'
      );
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders.');
      console.error(err);
    }
  };

  // Function to mark an order as served
  const markOrderAsServed = async (orderNumber) => {
    try {
      await axios.put(`http://localhost:5000/serve-order/${orderNumber}`);
      // Refresh the orders list after marking an order as served
      fetchPendingOrders();
    } catch (err) {
      setError('Failed to mark order as served.');
      console.error(err);
    }
  };

  // Fetch orders when the component is mounted and set up interval
  useEffect(() => {
    // Fetch orders immediately
    fetchPendingOrders();

    // Set up interval to fetch orders every 5 seconds
    const interval = setInterval(() => {
      fetchPendingOrders();
    }, 5000);

    // Clear interval when component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='barista-page p-0'>
      <div className='d-flex flex-column align-items-center'>
        <img src={header} alt='Header' />
        <img src={Kiosk} alt='Kiosk' />
      </div>
      <h1>Pending Coffee Orders</h1>
      {error && <p className='error-message'>{error}</p>}
      <div className='orders-list'>
        {orders.length === 0 ? (
          <p>No pending orders.</p>
        ) : (
          orders.map((order) => (
            <div key={order.orderNumber} className='order-item'>
              <p>
                <strong>Order Number:</strong> {order.orderNumber}
              </p>
              <p>
                <strong>Product:</strong> {order.product}
              </p>
              {order.milkOption && (
                <p>
                  <strong>Milk Option:</strong> {order.milkOption}
                </p>
              )}
              {order.teaFlavor && (
                <p>
                  <strong>Tea Flavor:</strong> {order.teaFlavor}
                </p>
              )}
              <button
                onClick={() => markOrderAsServed(order.orderNumber)}
                className='serve-button'
              >
                Mark as Served
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BaristaPage;
