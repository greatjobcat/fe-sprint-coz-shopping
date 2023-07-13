import React, { useState, useEffect } from 'react';
import Item from '../Item';

function ProductList({products, fetchProducts, isBookmarked, onBookmarkToggle}) {
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
    ? products
    : products.filter(product => product.type === filters[selectedFilter]);

  return (
    <div className="product-list-page">
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
        {filteredProducts.map((product) => (
          <Item key={product.id} item={product} type={product.type} isBookmarked={isBookmarked}
          onBookmarkToggle={onBookmarkToggle}/>
        ))}
      </div>
      </div>
    </div>
  );
}

export default ProductList;