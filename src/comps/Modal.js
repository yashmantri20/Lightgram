import React from 'react';
import { motion } from 'framer-motion';
import {
  auth,
  projectFirestore,
} from '../firebase/config';
import Toastify from 'toastify-js';

const Modal = ({ setSelectedImg, selectedImg }) => {

  const collectionRef = projectFirestore.collection(`${auth.currentUser.uid}`).doc(selectedImg.id)

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const deleteHandler = async () => {
    await collectionRef.delete();
    setSelectedImg(null);
    Toastify({
      text: "Image Deleted Successfully",
      duration: 3000,
      style: { background: 'green' }
    }).showToast()
  }

  return (
    <motion.div
      className='backdrop'
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedImg.url}
        alt='enlarged pic'
        initial={{ y: '0' }}
        animate={{ y: 0 }}
      />
      { collectionRef ? <center><button className='delete-btn' onClick={deleteHandler}>Delete</button></center> : ''}
    </motion.div>
  );
};

export default Modal;
