import React, { useState, useRef } from 'react';

export default function Header() {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const imgRef = useRef();
    const dropdownRef = useRef();

    window.addEventListener('click', (e) => {
        if(e.target !== imgRef.current && e.target !== dropdownRef.current) {
            setDropdownOpen(false);
        }
    });


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <img src="logo.svg" alt="logo" />
            <span className="logo-title">COZ Shopping</span>
          </div>
          
          <div className="nav">
          <img
            src="nav.png"
            alt="nav"
            onClick={toggleDropdown}
            ref={imgRef}
          />
          {dropdownOpen && (
            <div className="dropdown-content" ref={dropdownRef}>
              <div className='dropdown-list'>최유리님, 안녕하세요!</div>
              <div className='dropdown-list'><img src="item.png" alt="item-icon" className='nav-icon'/>상품리스트 페이지</div>
              <div className='dropdown-list'><img src="bookmark.png" alt="bookmark" className='nav-icon' />북마크 페이지</div>
            </div>
          )}
        </div>
        </div>
      </header>
    );
  }