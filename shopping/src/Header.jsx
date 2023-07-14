import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';


export default function Header() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const imgRef = useRef();
    const dropdownRef = useRef();

    window.addEventListener('click', (e) => {
        if(e.target !== imgRef.current && e.target !== dropdownRef.current) {
            setDropdownOpen(false);
        }
    });


    // useEffect(()=>{
    //   // 바깥 클릭했을때 함수선언부
    //   const clickOutside = (e) =>{
    //     if(e.target !== imgRef.current && e.target !== dropdownRef.current){
    //       setDropdownOpen(false);
    //     }
    //   }
    //   window.addEventListener('click', clickOutside);

    //   return () =>{
    //     window.removeEventListener('click', clickOutside);
    //   }
    // }, [dropdownOpen])

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <Link to ='/' className="custom-link">
            <img src="./logo.png" alt="logo" />
            <span className="logo-title">COZ Shopping</span>
            </Link>
          </div>
          
          <div className="nav">
          <img
            src="./nav.png"
            alt="nav"
            onClick={toggleDropdown}
            ref={imgRef}
          />
          {dropdownOpen && (
            <div className="dropdown-content" ref={dropdownRef}>
              <div className='dropdown-list'>최유리님, 안녕하세요!</div>
              <Link to = '/products/list' className="custom-link">
                <div className='dropdown-list'>
                  <img src="./item.png" alt="item" className='nav-icon' />
                  <span>상품리스트 페이지</span>
                </div>
              </Link> 
              <Link to ='/bookmark' className="custom-link">
                <div className='dropdown-list'>
                  <img src="./bookmark.png" alt="bookmark" className='nav-icon' />
                  <span>북마크페이지</span>
                </div>
              </Link>  
            </div>
          )}
        </div>
        </div>
      </header>
    );
  }