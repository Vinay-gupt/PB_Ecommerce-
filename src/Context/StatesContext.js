import React, { Children, createContext, useState } from "react";

export const data = createContext();

const StateContext = ({ children }) => {
  const [name, setName] = useState("");
  const [Loginnname, setLoginName] = useState("");

  const [email, setEmail] = useState("");
  const [Loginemail, setLoginEmail] = useState("");

  const [password, setPassword] = useState("");
  const [Loginpassword, setLoginPassword] = useState("");

  const [error, setError] = useState("");
  const [LoginData, setLoginData] = useState([]);
  const [FormData, setFormData] = useState([]);

  const [addresses, setAddresses] = useState([]);

  const addAddress = (address) => {
    setAddresses([...addresses, address]);
};

const [currentStep, setCurrentStep] = useState(0);


  return (
    <data.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        error,
        setError,
        Loginnname,
        setLoginName,
        Loginemail,
        setLoginEmail,
        Loginpassword,
        setLoginPassword,
        LoginData,
        setLoginData,
        setFormData,
        FormData,
        addresses, addAddress,
        currentStep,
        setCurrentStep
      }}
    >
      {children}
    </data.Provider>
  );
};

export default StateContext;
