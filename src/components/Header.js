import React, {useState, useEffect} from 'react';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import './Header.css'

const Header = () => {


  const [menuVisible , setMenuVisible] = useState(false);
  const [menuClass, setMenuClass] = useState('');

  const toggleMenu = (event) => {
    setMenuVisible(!menuVisible)
    event.preventDefault()
  }

  const handleClickOutside = event => {
    const domNode = ReactDOM.findDOMNode(this);

    if (!domNode || !domNode.contains(event.target)) {
      setMenuVisible(false);
      setMenuClass('');
    }
  }

  useEffect(() => {
    setMenuClass(menuVisible ? 'visible' : '');
  }, [menuVisible]);

  useEffect(() => {
    // Update the document title using the browser API
    document.addEventListener('click', handleClickOutside, true);
  });

  return(

    <header>
      <div className="container">
        <nav>
          <div id="logo-wrapper">
            <img id="logo" src="/logo.png" width="50" height="50"></img>
          </div>
          <div className="links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/resorts">Resort Listing</Link>
          </div>
          <div className="searchbar">
            <input type="text" placeholder="Start your search" className="search_input"></input>
            <button className="search_icon"><i className="fa fa-search"></i></button>
          </div>
          <div className="dropdown">
            <div className={ 'user-menu '+ menuClass }>
              <Link to="/login" href="/">Login</Link>
              <Link to="/registration" href="/">Sing up</Link>
            </div>
            <a href="#" className="btn dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" onClick={toggleMenu}>
              <i className="fa fa-user-circle"></i>
            </a>
          </div>
        </nav>
      </div>
    </header>)
};

export default Header;