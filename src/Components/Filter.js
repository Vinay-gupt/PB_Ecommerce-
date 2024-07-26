import React, { useContext, useState } from 'react'
import { data } from '../Context/StatesContext';

const Filter = ({none}) => {
    const {
        furniture,
        setfurniture,
        mensshirts,
        setmensshirts,
        laptops,
        setlaptops,
        watches,
        setwatches

      } = useContext(data);
    const [isVisible, setIsVisible] = useState(false);
    // console.log(Mens);
    const toggleForm = () => {
      setIsVisible(!isVisible);
    };
  return (
    <>
        <img style={{aspectRatio:"3/4",width:"10%",mixBlendMode:"darken",filter:"brightness(0.5)", display : none?"none":"block",marginRight:"1rem"}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOhuy_XTB3n4ZjpKxU-hWI8wNowxh9m8W4fA&s" alt="" onClick={toggleForm} />

        <div className={`sliding-form ${isVisible ? 'visible' : ''}`}>
        <label className="checkbox-container">
          <input type="checkbox" value={furniture}  onClick={()=>setfurniture(!furniture)} />
          <span className="checkmark"></span>
          Furniture
        </label>
        <label className="checkbox-container">
          <input type="checkbox"  value={mensshirts}  onClick={()=>setmensshirts(!mensshirts)} />
          <span className="checkmark"></span>
          Men's Shirts
        </label>
        <label className="checkbox-container">
          <input type="checkbox" value={laptops} onClick={()=>setlaptops(!laptops)} />
          <span className="checkmark"></span>
          Laptops
        </label>
        <label className="checkbox-container">
          <input type="checkbox" value={watches} onClick={()=>setwatches(!watches)} />
          <span className="checkmark"></span>
          Watches
        </label>
      </div>
    </>
  )
}

export default Filter