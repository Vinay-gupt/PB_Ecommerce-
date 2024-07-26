import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Add, remove } from "../Action";
import Swal from "sweetalert2";
import { data } from "../Context/StatesContext";

const Products = () => {
  const {
    furniture,
    mensshirts,
    laptops,
    watches,
  } = useContext(data);

  const selectedCategories = [];
  if (furniture) selectedCategories.push("furniture");
  if (mensshirts) selectedCategories.push("mens-shirts");
  if (laptops) selectedCategories.push("laptops");
  if (watches) selectedCategories.push("mens-watches");

  const categories = ["furniture", "mens-shirts", "laptops", "mens-watches", "womens-bags"];
  const baseUrl = "https://dummyjson.com/products/category/";

  const fetchAndMergeCategories = async () => {
    try {
      const fetchPromises = categories.map((category) =>
        axios.get(`${baseUrl}${category}?limit=40`) // Changed to 40
      );
      const results = await Promise.all(fetchPromises);

      // Combine all products from the results
      const mergedProducts = results.flatMap((result) => result.data.products);
      console.log(mergedProducts);
      return mergedProducts;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const [products, setProducts] = useState([]);
  const prodData = async () => {
    const mergedProducts = await fetchAndMergeCategories();
    setProducts(mergedProducts);
    console.log(mergedProducts);
  };

  const Cart = useSelector((state) => state.Product);
  const dispatch = useDispatch();

  useEffect(() => {
    prodData();
  }, []);

  const scrollRef = useRef(null);
  const scrollRef2 = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -800, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollLeft2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({
        left: -800, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 800, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const scrollRight2 = () => {
    if (scrollRef2.current) {
      scrollRef2.current.scrollBy({
        left: 800, // Adjust the value to control the scroll distance
        behavior: "smooth",
      });
    }
  };

  const filteredProducts = products?.filter((item) => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(item.category);
  });

  const renderHeading = () => {
    if (selectedCategories.length === 0) {
      return <h1 style={{ textAlign: "center" }}>ALL PRODUCTS</h1>;
    }
    return (
      <h1 style={{ textAlign: "center" }}>
        Products in: {selectedCategories.map((category, index) => (
          <span style={{color:"black",textTransform:"uppercase",fontSize:"1.8rem"}} key={index}>
            {category.replace("-", " ")}
            {index < selectedCategories.length - 1 ? ', ' : ''}
          </span>
        ))}
      </h1>
    );
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      {renderHeading()}

      <div className="horizontal-scroll-container">
        <button className="scroll-button left" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="horizontal-scroll" ref={scrollRef}>
          {filteredProducts.map((item, index) => (
            <div key={index} className="scroll-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="item-image1"
              />
              <p className="item-text">{item.title?.slice(0, 30)}....</p>
              <p className="item-text">${item.price}</p>
              {Cart?.some((p) => p.id === item.id) ? (
                <div
                  className="add-cart"
                  onClick={() => {
                    dispatch(remove(item.id));
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Item Removed",
                      showConfirmButton: false,
                      timer: 800,
                    });
                  }}
                >
                  <button>Remove from Cart</button>
                </div>
              ) : (
                <div
                  className="add-cart"
                  onClick={() => {
                    dispatch(Add(item));
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Product successfully added",
                      showConfirmButton: false,
                      timer: 800,
                    });
                  }}
                >
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

      {renderHeading()}
      <div className="horizontal-scroll-container">
        <button className="scroll-button left" onClick={scrollLeft2}>
          &lt;
        </button>
        <div className="horizontal-scroll" ref={scrollRef2}>
          {filteredProducts.reverse().map((item, index) => (
            <div key={index} className="scroll-item">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="item-image1"
              />
              <p className="item-text">{item.title?.slice(0, 35)}</p>
              <p className="item-text">${item.price}</p>
              {Cart?.some((p) => p.id === item.id) ? (
                <div
                  className="add-cart"
                  onClick={() => {
                    dispatch(remove(item.id));
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Item Removed",
                      showConfirmButton: false,
                      timer: 800,
                    });
                  }}
                >
                  <button>Remove from Cart</button>
                </div>
              ) : (
                <div
                  className="add-cart"
                  onClick={() => {
                    dispatch(Add(item));
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Product successfully added",
                      showConfirmButton: false,
                      timer: 800,
                    });
                  }}
                >
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
