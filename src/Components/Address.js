// Address.js
import React, { useContext, useEffect, useState } from "react";
// import { useStateContext } from './StateContext';
// import './Address.css';
import { data } from "../Context/StatesContext";
import Navbar from "./Navbar";
import ProgressBar from "./ProgessBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Address = () => {
  const { addAddress, addresses } = useContext(data);
  const [show, setshow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const cartItems = useSelector((state) => state.Product);
  const [Total, setTotal] = useState(0);
  useEffect(()=>{
    setTotal(Math.round(cartItems.reduce((total, item) => total + item.price, 0)))
 },[cartItems])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(formData);
    setFormData({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
    console.log(addresses);
    setshow(!show);
  };
  const { currentStep, setCurrentStep } = useContext(data);

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
  };
  return (
    <>
      <Navbar />
      <ProgressBar currentStep={1}  />
      <div className="main3" style={{ marginTop: "7rem",flexDirection:"row",alignItems:"flex-start",justifyContent:"space-around" }}>
        <div
          style={{
            width: "60%",
            borderRadius: "5px",
            backgroundColor: "#dadadad9",
            height: "33rem",
            marginTop: "3rem",
          }}
          className="main3"
        >
          <div
            className="main3"
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              width: "60%",
            }}
          >
            <h4>Select Delivery Address</h4>
            <button style={{ margin: "1rem" }} onClick={() => setshow(!show)}>
              {" "}
              Add Address +{" "}
            </button>
          </div>
          {addresses.map((address, ind) => (
            <div
              key={ind}
              style={{
                border: "0px solid gray",
                width: "60%",
                textAlign: "center",
                borderRadius: "5px",
                backgroundColor: "rgb(231, 238, 255)",
                margin: "5px",
              }}
            >
              <h2>{address.name}</h2>
              <h3>
                {address.street.toUpperCase()},{address.city},{address.state},
                {address.zip}
              </h3>
              <Link to="/payment">
                <button style={{ marginBottom: "1rem" }}>
                  Deliver to this address
                </button>
              </Link>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "3rem",
            backgroundColor: "white",
            width: "30%",
            textAlign: "center",
            height: "15rem",
            boxShadow: "8px 8px 8px 8px gray",
          }}
        >
          <h2>Subtotal {cartItems.length} items</h2>
          <h1>Total: $ {Total}</h1>
        </div>
        <form
          className={`address-form  ${show ? "show" : "hidden"}`}
          onSubmit={handleSubmit}
        >
          <div className="address-form-group">
            <label className="address-label" htmlFor="name">
              Name:
            </label>
            <input
              className="address-input"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="address-form-group">
            <label className="address-label" htmlFor="street">
              Street:
            </label>
            <input
              className="address-input"
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
          <div className="address-form-group">
            <label className="address-label" htmlFor="city">
              City:
            </label>
            <input
              className="address-input"
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="address-form-group">
            <label className="address-label" htmlFor="state">
              State:
            </label>
            <input
              className="address-input"
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="address-form-group">
            <label className="address-label" htmlFor="zip">
              Zip Code:
            </label>
            <input
              className="address-input"
              type="text"
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
          <button className="address-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Address;
