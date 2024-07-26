// src/components/Home.js
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Buttons from "./Buttons";
import Cart from "./Cart";
import Products from "./Products";
import { data } from "../Context/StatesContext";
import Navbar from "./Navbar";
import ImagePicker from "./ImagePicker";

const Home = () => {
  const {
    Loginnname,
    setLoginName,
  } = useContext(data);
  const location = useLocation();
  const { name, email } = location.state || {
    name: "Guest",
    email: "guest@example.com",
  };
  setLoginName(name)
  return (
    <div>
      <Navbar/>
      <Products />
    </div>
  );
};
export default Home;
