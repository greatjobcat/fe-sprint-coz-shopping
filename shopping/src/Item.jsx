import React, { useState, useEffect, useRef } from 'react';
import { FaStar } from 'react-icons/fa';

const Item = ({ item, type, onBookmarkToggle, isBookmarked}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isModalOpen && modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);


  return (
    <div className={`${type}-container`} key={item.id}>
      <div className="image-container">
      <img src={type === 'Brand' ? item.brand_image_url : item.image_url} alt={type} onClick={handleImageClick} className='product-img'/>

      <div className={`bookmark-button ${isBookmarked ? 'bookmarked' : ''}`} onClick={()=>onBookmarkToggle(item)}>
        {isBookmarked(item) ? <FaStar className="star-icon full" /> : <FaStar className="star-icon empty" />}
      </div>
      </div>

      {item.title && <div className="product-title">{type === 'Category' ? `#${item.title}` : item.title}</div>}
      {item.discountPercentage && <div className="discount-percentage">{`${item.discountPercentage}%`}</div>}
      {item.price && <div className={`${type}-price`}>{item.price}</div>}
      {item.sub_title && <div className={`${type}-subtitle`}>{item.sub_title}</div>}
      {item.brand_name && <div className="product-title">{item.brand_name}</div>}
      {item.follower && <div className={`${type}-follower`}><div className='product-title'>{'관심고객수'}<br /></div>{item.follower.toLocaleString()}</div>}
    
      {isModalOpen && (
        <div className="modal">
          <div ref={modalRef} className="modal-content">
          <div className="modal-image-container">
          <img src={type === 'Brand' ? item.brand_image_url : item.image_url} alt={type} onClick={handleImageClick} className='modal-product-img'/>
          <span className="close" onClick={closeModal}>&times;</span>

          <div className={`modal-bookmark-button ${isBookmarked ? 'bookmarked' : ''}`} onClick={()=>onBookmarkToggle(item)}>
          {isBookmarked(item) ? <FaStar className="modal-star-icon full" /> : <FaStar className="modal-star-icon empty" />}
          </div>
          </div>


          </div>
        </div>
      )}    
    
    
    
    
    </div>
  );
};

export default Item;