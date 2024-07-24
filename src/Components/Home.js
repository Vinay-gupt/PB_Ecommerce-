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
      {/* <Cart /> */}
      <Navbar/>
      <Products />
      {/* <ImagePicker/> */}
      {/* <Buttons name={name}/> */}
      {/* <Buttons /> */}
      {/* <h2 style={{ textAlign: "center" }}>Home Page</h2>
      <h3 style={{ textAlign: "center" }}>Welcome, {name}</h3>
      <p style={{ textAlign: "center" }}>Your email is: {email}</p>

      <div className="main1">
        <Link to="/signup">
          <button style={{ margin: "1rem" }}>Go to Sign Up page</button>
        </Link>
        <br />
        <br />
        <Link to="/">
          <button>Go to Login Up page</button>
        </Link>
      </div> */}
    </div>
  );
};
export default Home;
