import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Add,remove } from "../Action";
import Swal from "sweetalert2";
const Products = () => {
  const [products, setproducts] = useState([]);
  const prodData = async () => {
    let res = await axios.get("https://fakestoreapi.com/products");
    setproducts(res.data);
    console.log(products);
  };
  const Cart = useSelector((state) => state.Product);
  console.log(Cart);
  const dispatch = useDispatch();

  useEffect(() => {
    prodData();
  }, []);
  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -200, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };
  const scrollLeft2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({
        left: -200, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 200, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };
  const scrollRight2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({
        left: 200, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };
  return (
      <div style={{marginTop:"5rem",backgroundcolor: "#e0e5e9" }}>
        <h1 style={{ textAlign: "center" }}>PRODUCTS</h1>
      <div className="horizontal-scroll-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="horizontal-scroll" ref={scrollRef}>
          {products?.map((item, index) => (
            <div key={index} className="scroll-item">
              <img src={item.image} alt={item.title} className="item-image1" />
              <p className="item-text">{item.title?.slice(0, 35)}</p>
              <p className="item-text">${item.price}</p>
              {Cart?.some((p)=>p.id === item.id)?(<div className="add-cart" onClick={() => {dispatch(remove(item.id))
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Item Removed",
                  showConfirmButton: false,
                  timer: 800
                });
              }}>
                <button>Remove from Cart</button>
              </div>):(
                <div className="add-cart" onClick={() => {dispatch(Add(item))
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product successfully added",
                    showConfirmButton: false,
                    timer: 800
                  });
                }}>
                <button>Add To Cart</button>
              </div>
              )}
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>
          &gt;
        </button>
      </div>

        <h1 style={{ textAlign: "center" }}>PRODUCTS</h1>
      <div className="horizontal-scroll-container">
        <button className="scroll-button left" onClick={scrollLeft2}>
          &lt;
        </button>
        <div className="horizontal-scroll" ref={scrollRef2}>
          {products?.reverse().map((item, index) => (
            <div key={index} className="scroll-item">
              <img src={item.image} alt={item.title} className="item-image1" />
              <p className="item-text">{item.title?.slice(0, 35)}</p>
              <p className="item-text">${item.price}</p>
              {Cart?.some((p)=>p.id === item.id)?(<div className="add-cart" onClick={() => {dispatch(remove(item.id))
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Item Removed",
                  showConfirmButton: false,
                  timer: 800
                });
              }}>
                <button>Remove from Cart</button>
              </div>):(
                <div className="add-cart" onClick={() => {dispatch(Add(item))
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product successfully added",
                    showConfirmButton: false,
                    timer: 800
                  });
                }}>
                <button>Add To Cart</button>
              </div>
              )}
            </div>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight2}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Products;
