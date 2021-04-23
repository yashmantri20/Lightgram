import React, { useEffect } from 'react';
import Toastify from 'toastify-js';
import useStorage from '../hooks/useStorage';
import "toastify-js/src/toastify.css"

const ProgressBar = ({ file, setFile }) => {
  const { url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      Toastify({
        text: "Image Uploaded Successfully",
        duration: 3000,
        style: { background: 'green' }
      }).showToast()
    }
  }, [url, setFile]);

  return file ? <p>Uploading...</p> : '';
};

export default ProgressBar;
