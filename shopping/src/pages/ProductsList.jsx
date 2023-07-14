import React, { useState, useEffect } from 'react';
import Item from '../Item';

function ProductList({products, fetchProducts, isBookmarked, onBookmarkToggle}) {
  const [selectedFilter, setSelectedFilter] = useState('전체');

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //        window.innerHeight + document.documentElement.scrollTop ===
  //        document.documentElement.offsetHeight
  //       
  //     ) {
  //       fetchProducts();
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [fetchProducts]);


  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (isBottom) {
       fetchProducts();
    }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchProducts]);

  
  
  const filters = {
    전체: { type : 'all', img: "../이미지.jpg"},
    상품: { type : 'Product', img: "../이미지2.jpg"},
    카테고리: { type : 'Category', img: "../이미지3.jpg"},
    기획전: { type : 'Exhibition', img: "../이미지4.jpg"},
    브랜드: { type : 'Brand', img: "../이미지5.jpg"}
  };

  const filteredProducts = selectedFilter === '전체'
    ? products
    : products.filter(product => product.type === filters[selectedFilter].type);

  return (
    <div className="product-list-page">
      <div className="container">
      <div className="filters">
        {Object.keys(filters).map(filter => (
          <div
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`filter-container ${selectedFilter === filter ? 'active' : ''}`}
          >
            <img src={filters[filter].img} alt={filters[filter].type} />
            <span>{filter}</span>
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