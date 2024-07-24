import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import ProgressBar from './ProgessBar';

const Summary = () => {
    const cartItems = useSelector((state) => state.Product);
    const [Total, setTotal] = useState(0);
    useEffect(()=>{
      setTotal(Math.round(cartItems.reduce((total, item) => total + item.price, 0)))
   },[cartItems])
  // Assuming cartItems is an array of objects with product details
  return (
    <>
    <Navbar/>
    <ProgressBar currentStep={3}/>
    <div className="summary-section" style={{marginTop:"10rem"}}>
      <h2>Your Order Summary</h2>
      <div className="summary-items">
        {cartItems.length === 0 ? (
          <p className="no-items">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <h3 className="item-name">{item.title}</h3>
                <p className="item-price">${item.price.toFixed(2)}</p>
                {/* <p className="item-quantity">Quantity: {item.quantity}</p> */}
              </div>
              <p className="item-total">Total: ${item.price}</p>
            </div>
          ))
        )}
      </div>
      <div className="summary-footer">
        <h3>
          Grand Total: $
          {Total}
        </h3>
      </div>
    </div>
    </>
  );
};

export default Summary;
