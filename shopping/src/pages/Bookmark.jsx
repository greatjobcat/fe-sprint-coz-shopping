import React, { useState, useEffect } from 'react';
import Item from '../Item';

export default function Bookmark({
    isBookmarked,
    onBookmarkToggle,
    bookmarkedProducts,
    fetchProducts,}) {
    
    const [selectedFilter, setSelectedFilter] = useState('전체');

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchProducts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchProducts]);
  
  const filters = {
    전체: 'all',
    상품: 'Product',
    카테고리: 'Category',
    기획전: 'Exhibition',
    브랜드: 'Brand',
  };

  const filteredProducts = selectedFilter === '전체'
    ? bookmarkedProducts
    : bookmarkedProducts.filter(product => product.type === filters[selectedFilter]);


    return (
    <div className="bookmark">
      <div className="container">
      <div className="filters">
        {Object.keys(filters).map(filter => (
          <div
            key={filter}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </div>
        ))}
      </div>
      
      <div className="products">
        {filteredProducts.map(product => (
          <Item key={product.id} item={product} type={product.type} isBookmarked={isBookmarked}
          onBookmarkToggle={onBookmarkToggle}/>
        ))}
      </div>
      </div>
    </div>
        
    );
}