import { FaStar } from 'react-icons/fa';

const Item = ({ item, type, onBookmarkToggle, isBookmarked}) => {
  
  return (
    <div className={`${type}-container`} key={item.id}>
      <div className="image-container">
      <img src={type === 'Brand' ? item.brand_image_url : item.image_url} alt={type} className='product-img'/>

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
    </div>
  );
};

export default Item;