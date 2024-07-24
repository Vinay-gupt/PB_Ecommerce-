import React from 'react';
import { Link } from 'react-router-dom';
// import './ProgressBar.css';

const ProgressBar = ({ currentStep,Location }) => {
    const steps = ['Cart', 'Address', 'Payment', 'Summary'];

    return (
        <div className="progress-container" style={{fontWeight:'bold', backgroundColor:"white",padding:"5px 0px"}}>
            {steps.map((step, index) => (
                <div 
                    key={index} 
                    className={`progress-step ${index < currentStep ? 'completed' : ''} ${index === currentStep ? 'active' : ''}`}
                    // className='active progress-step'
                >
                    <div className="circle">{index + 1}</div>
                    <div className="label" style={{color:"black"}}>{step}</div>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
