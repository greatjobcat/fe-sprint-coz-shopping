import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./pages/Main";
import ProductsList from "./pages/ProductsList";
import Bookmark from "./pages/Bookmark";

function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [bookmarkedProducts, setBookmarkedProducts] = useState([]);

  const fetchProducts = () => {
    axios
      .get(
        `http://cozshopping.codestates-seb.link/api/v1/products?count=4&page=${page}`
      )
      .then((response) => {
        const newProducts = response.data;

        const filteredProducts = newProducts.filter((newProduct) => {
          return !products.some((existingProduct) => existingProduct.id === newProduct.id);
        });
        setProducts((prevProducts) => [...prevProducts, ...filteredProducts]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  const toggleBookmark = (product) => {
    setBookmarkedProducts((prevBookmarkedProducts) => {
      const isProductBookmarked = isBookmarked(product);
  
      if (isProductBookmarked) {
        return prevBookmarkedProducts.filter((p) => p.id !== product.id);
      } else {
        return [...prevBookmarkedProducts, product];
      }
    });
  };
  
  const isBookmarked = (product) => {
    return bookmarkedProducts.some((p) => p.id === product.id);
  };


  return (
    <div className="App">
      <Router>
        <Header />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                products={products}
                isBookmarked={isBookmarked}
                onBookmarkToggle={toggleBookmark}
                bookmarkedProducts={bookmarkedProducts}
              />
            }
          />
          <Route
            path="/products/list"
            element={
              <ProductsList
                products={products}
                fetchProducts={fetchProducts}
                isBookmarked={isBookmarked}
                onBookmarkToggle={toggleBookmark}
              />
            }
          />
          <Route
            path="/bookmark"
            element={
              <Bookmark
                isBookmarked={isBookmarked}
                onBookmarkToggle={toggleBookmark}
                bookmarkedProducts={bookmarkedProducts}
                fetchProducts={fetchProducts}

              />
            }
          />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
