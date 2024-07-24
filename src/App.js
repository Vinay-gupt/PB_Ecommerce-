import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Components/Home";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Cart from "./Components/Cart";
import Address from "./Components/Address";
import Payment from "./Components/Payment";
import Summary from "./Components/Summary";
// import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <>
      <Router>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/address" element={<Address />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </Router>
    </>
  );
}
