import React, { useState } from 'react';
import Navbar from './Navbar';
import ProgressBar from './ProgessBar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState('');
    const [ResponseId, setResponseId] = useState("");
    const [responseState, setresponseState] = useState([])
    const navigate = useNavigate();

    const handlePaymentChange = (e) => {
      setSelectedPayment(e.target.value);
    };

    const loadScript=(src)=>{
      return new Promise((resolve)=>{
        const script=document.createElement("script");
        script.src=src;

        script.onload=()=>{
          resolve(true)
        }
        script.onerror=()=>{
          resolve(false)
        }
        document.body.appendChild(script)
      })
    }

    const createRazorpayOrder=(amount)=>{
      let data=JSON.stringify({
        amount:amount*100,
        currency:"INR"

      })
      let config={
        method:"post",
        maxBodyLength: Infinity,
        url:"https://pb-backend-xysk.onrender.com/orders",
        headers:{
          "Content-Type":"application/json"
        },
        data:data
      }
      axios.request(config)
      .then((response)=>{
        console.log(JSON.stringify(response.data));
        handleRazorpayScreen(response.data.amount)
      })  
      .catch((err)=>{
        console.log(err);
      })
    }

    const handleRazorpayScreen= async(amount)=>{
      console.log("hi");
      
        const res=await loadScript("https://checkout.razorpay.com/v1/checkout.js")
        console.log(res);
             
      if(!res){
        alert("Some error on the loading screen")
        return
      }
      const options={
        key:"rzp_test_1nB4lEPE2FxrkX",
        amount:amount,
        currency:"INR",
        name:"Vinay",
        description:'Payment to Vinay',
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0FrHeIMSazA5ukzO9Khnt39gAdqsFPBHaA&s",
        handler: function(response){
          setResponseId(response.razorpay_payment_id)
          navigate('/summary'); // Redirect to summary page after payment

        },
        prefill:{
          name:"Vinay",
          email:"Vinay@12"
        },
        theme:{
          color:"#F4C430"
        }
      }
      console.log("window");
      const paymentObject= new window.Razorpay(options)
      paymentObject.open()


    }


    const paymentFetch=(e)=>{
        e.preventDefault();

        const paymentId=e.target.paymentId.value;
        axios.get(`https://pb-backend-xysk.onrender.com/payment/${paymentId}`)
        .then((response)=>{
          setresponseState(response.data)
        })
        .catch((err)=>{
          console.log("err",err);
        })
    }

  return (
    <>
    <Navbar/>
    <ProgressBar currentStep={2} />
    <div className="payment-section" style={{"marginTop":"10rem"}}>
      <h2>Select Payment Method</h2>
      <div className="payment-options">
        {['UPI', 'Wallet', 'Debit Card', 'Credit Card', 'COD', 'Net Banking'].map((payment) => (
          <label key={payment} className="payment-option">
            <input
              type="radio"
              name="payment"
              value={payment}
              checked={selectedPayment === payment}
              onChange={handlePaymentChange}
            />
            <span className="payment-label">{payment}</span>
          </label>
        ))}
        <Link to=""><button disabled={selectedPayment===""} onClick={()=>createRazorpayOrder(200)}>Proceed to Payment</button></Link>

        {ResponseId && <h3>{ResponseId}</h3>}
        <h2>Payment Verification Form</h2>
        <form onSubmit={paymentFetch} className='main3'>
          <input type="text" name='paymentId' />
          <button type='submit'>Fetch Payment</button>
          {responseState.length !==0 && (
            <ul>
              <li>Amount: {responseState.amount/100} Rs</li>
              <li>Currency: {responseState.currency}</li>
              <li>Status: {responseState.status}</li>
              <li> Method: {responseState.method}</li>
            </ul>
          )}
        </form>
        
      </div>
    </div>
    </>
  );
};

export default Payment;
