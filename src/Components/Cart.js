// src/components/CartDropdown.js
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { remove } from "../Action";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import ProgressBar from "./ProgessBar";
import { Link } from "react-router-dom";
import { data } from "../Context/StatesContext";
// import "./CartDropdown.css";

const Cart = () => {
  const [Total, setTotal] = useState(0);
  const cartItems = useSelector((state) => state.Product);
  // console.log(cartItems);
  const dispatch = useDispatch();

   useEffect(()=>{
      setTotal(Math.round(cartItems.reduce((total, item) => total + item.price, 0)))
   },[cartItems])
  
   const{currentStep,setCurrentStep}=useContext(data)

   const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    window.history.pushState({ step: currentStep + 1 }, '');
};


  return (
    <>
    <Navbar none={true}/>
    
            <ProgressBar currentStep={0} />
            
           
    <div className="main3" style={{flexDirection:"row",flexWrap:"wrap",alignItems:"flex-start",justifyContent:"space-evenly",}}>
    {cartItems.length===0?(
      <div style={{marginTop:"8rem"}}>
        <h2 style={{textAlign:"center"}}>Cart is empty</h2>

    </div>):(<div style={{marginTop:"8rem",borderRight:"1px solid gray",flexWrap:"wrap"}} className="main3" >
    {cartItems.map((Items)=>(
      <div className="card" key={Items.id} style={{boxshadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"}}>
      <div className="card-wrapper">
        <div className="card-icon">
          <div className="icon-cart-box">
            <img src={Items.thumbnail} alt="" style={{aspectRatio:"3/4",width:"100%"}} />
          </div>
        </div>
    
        <div className="card-content">
          <div className="card-title-wrapper">
            <span className="card-title">Added to cart!</span>
            <span className="card-action">
            </span>
          </div>
          <div className="product-name">{Items.title}</div>
          <div className="product-price">{Items.price}</div>
          <button className="btn-view-cart" type="button" onClick={()=>{
            dispatch(remove(Items.id))
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Item Removed",
              showConfirmButton: false,
              timer: 500
            });
            }}>🗑️</button>
        </div>
      </div>
    </div>
    ))}

    </div>)}
    <div className="Cart-sidebox" >
      <h2>Subtotal {cartItems.length} items</h2>
      <h1>Total: $ {Total}</h1>
      <Link to="/address"><button disabled={cartItems.length===0} onClick={() => {
                        handleNext
                        window.scroll({
                            top: 0,
                             behavior:"instant"
                        });
                    }} >Proceed to Checkout</button>
      </Link>
    </div>
    </div>
    </>
  );
};

export default Cart;
