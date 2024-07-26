// src/components/Login.js
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { data } from "../Context/StatesContext";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    Loginnname,
    setLoginName,
    Loginemail,
    setLoginEmail,
    Loginpassword,
    setLoginPassword,
    LoginData,
    setLoginData,
    FormData,
  } = useContext(data);
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  console.log(FormData, "hi");
  const navigate = useNavigate();

  

  // const handleSubmit1 = (event) => {
  //   event.preventDefault();

  //   // Check if credentials match any entry in FormData
  //   const isValidUser = FormData.some(
  //     (entry) =>
  //       entry.name === Loginnname &&
  //       entry.email === Loginemail &&
  //       entry.password === Loginpassword
  //   );
  //   if (isValidUser) {
  //     // Redirect to the home page
  //     setLoginName(" ");
  //     setLoginEmail(" ");
  //     setLoginPassword(" ");
  //     navigate("/home", { state: { name: Loginnname, email: Loginemail } });
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Successfully Logged in",
  //         showConfirmButton: false,
  //         timer: 800
  //       });
  //   } else {
  //     setLoginError("Invalid Credentials");
  //     setShowError(true);
  //     setTimeout(() => {
  //       setShowError(false);
  //       setLoginError("");
  //     }, 3000);
  //   }
  // };

  const onSubmit = (data) => {
    setLoginData([data]);
    console.log(LoginData);
  
    // Use 'data' directly for validation
    const validate = FormData.some(formUser => 
      formUser.email === data.email && formUser.password === data.password
    );
  
    console.log(validate);
    
    if (validate) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Login",
        showConfirmButton: false,
        timer: 800,
      });
      reset();
      navigate("/home");
    } else {
      setShowError(true);
    }
  };
  
  return (
    <div className="main2">
    <div className="container">
      <div className="form_area">
        <p className="title">LOGIN</p>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          {showError && <span>Invalid Credencials</span>}
          <div>
            <button className="btn1">Login UP</button>
            <p>
              Don't an Account?{" "}
              <Link className="link" to="/signup">
                Signup Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default Login;
