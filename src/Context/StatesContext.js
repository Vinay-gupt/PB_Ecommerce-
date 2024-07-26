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

  //FILTERS
  const[furniture,setfurniture]=useState(false)
  const[mensshirts,setmensshirts]=useState(false)
  const[laptops,setlaptops]=useState(false)
  const[watches,setwatches]=useState(false)

  
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
        setCurrentStep,
        furniture,
        setfurniture,
        mensshirts,
        setmensshirts,
        laptops,
        setlaptops,
        watches,
        setwatches

      }}
    >
      {children}
    </data.Provider>
  );
};

export default StateContext;
