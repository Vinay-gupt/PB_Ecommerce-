import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../Context/StatesContext";

const Buttons = ({name}) => {
  const {
    Loginnname,
    setLoginName,
  } = useContext(data);
  
  const [image, setImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    const storedImage = localStorage.getItem('image');
    const storedImageUrl = localStorage.getItem('imagePreviewUrl');

    if (storedImage && storedImageUrl) {
      setImage(storedImage);
      setImagePreviewUrl(storedImageUrl);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setImagePreviewUrl(reader.result);
        localStorage.setItem('image', file);
        localStorage.setItem('imagePreviewUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
<label className="popup">
  <input type="checkbox"  />
  <div tabindex="0" className="burger" >
  {/* <div className="image-uploader"> */}
      {image && (
        <div className="image-preview">
          <img src={imagePreviewUrl} alt="Selected" style={{width:"100%",borderRadius:"50%"}} />
        </div>
      )}
    {/* </div> */}
  </div>
  <nav className="popup-window">
    <legend>Quick Start</legend>
    <ul>
      <li >
        <button style={{}}>
        <img src={imagePreviewUrl} alt="Selected" style={{width:"25%",borderRadius:"50%"}} />
        <label className="custom-file-upload" for="file-upload">
          {Loginnname}
          <input type="file" id="file-upload" accept="image/*" style={{display:"none",width:"50%"}}  onChange={handleImageChange} />
        </label>
        </button>
      </li>
      <li>
        <Link to='/' style={{textDecoration:"none"}}>
        <button>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            stroke-linecap="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.598 9h-1.055c1.482-4.638 5.83-8 10.957-8 6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5c-5.127 0-9.475-3.362-10.957-8h1.055c1.443 4.076 5.334 7 9.902 7 5.795 0 10.5-4.705 10.5-10.5s-4.705-10.5-10.5-10.5c-4.568 0-8.459 2.923-9.902 7zm12.228 3l-4.604-3.747.666-.753 6.112 5-6.101 5-.679-.737 4.608-3.763h-14.828v-1h14.826z"
            ></path>
          </svg>
          <span>LogOut</span>
        </button>
        </Link>
      </li>
    </ul>
  </nav>
</label>

  );
};

export default Buttons;
