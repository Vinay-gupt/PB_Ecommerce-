// src/components/FormComponent.js
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data } from "../Context/StatesContext";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
const FormComponent = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    setError,
    FormData,
    setFormData,
  } = useContext(data);
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [countryid, setCountryid] = useState(0);
  const [countryname, setCountryname] = useState("");
  const [statename, setstatename] = useState("");
  const [stateid, setstateid] = useState(0);

  // console.log(countryid,stateid);
  const onSubmit = (data) => {
    const newEntry = { ...data, phone,countryname,statename }; // Include the phone number in the form data
    setFormData([...FormData, newEntry]);
    console.log(newEntry);
    console.log(FormData);
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Successfully Signup",
      showConfirmButton: false,
      timer: 800,
    });
    reset();
    navigate("/");
  };

  return (
    <div className="main2">
      <div className="container">
        <div className="form_area">
          <p className="title">SIGN UP</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form_group">
              <label className="sub_title" for="name">
                Name
              </label>
              <input
                {...register("name", { required: true })}
                placeholder="Enter your full name"
                name="name"
                className="form_style"
                type="text"
              />
              {errors.name && <span>This field is required</span>}
            </div>

            <div className="form_group">
              <label className="sub_title" for="email">
                Email
              </label>
              <input
                {...register("email", { required: true })}
                name="email"
                placeholder="Enter your email"
                id="email"
                className="form_style"
                type="email"
              />
              {errors.email && <span>This field is required</span>}
            </div>

            <div className="form_group">
              <label className="sub_title" for="password">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                name="password"
                placeholder="Enter your password"
                id="password"
                className="form_style"
                type="password"
              />
              {errors.password && <span>This field is required</span>}
            </div>

            <div className="form_group">
              <label className="sub_title" for="password">
                Phone Number
              </label>
              <PhoneInput
                placeholder="Enter the Phone Number"
                country={"ind"}
                enableSearch={true}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
              {/* {errors.number && <span>This field is required</span>} */}
            </div>
            <div className="form_group">
              <label className="sub_title" for="password">
                Country
              </label>
              <CountrySelect
                onChange={(e) => {
                  setCountryid(e.id);
                  setCountryname(e.name)
                }}

                className="form_style"
                placeHolder="Select Country"
              />
              {/* {errors.number && <span>This field is required</span>} */}
            </div>
            <div className="form_group">
              <label className="sub_title" for="password">
                State
              </label>
              <StateSelect
                countryid={countryid}
                onChange={(e) => {
                  setstateid(e);
                  setstatename(e.name)
                }}
                className="form_style"

                placeHolder="Select State"
              />
              {/* {errors.number && <span>This field is required</span>} */}
            </div>
            <div>
              <button className="btn1">SIGN UP</button>
              <p>
                Have an Account?{" "}
                <Link className="link" to="/">
                  Login Here!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
