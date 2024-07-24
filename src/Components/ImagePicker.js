import React, { useState, useEffect } from 'react';

const ImageUploader = () => {
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
    <div className="image-uploader">
      <h2>Upload and Display Image</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div className="image-preview">
          <h3>Image Preview:</h3>
          <img src={imagePreviewUrl} alt="Selected" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
