import React from 'react';

const Header = () => {


  return(
  
  <header>
    <div className="container">
      
            <nav>
                <ul>
                    <li>
                        <a href="/">Home</a>
                    
                    </li>

                    <li>
                        <a href="/">About</a>
                    </li>

                    <li>
                        <a href="/">Resort Listing</a>
                    </li>

                    <li>
                        <a href="/">Login</a>
                    </li>
                    <li>
                        <a href="/">Registration</a>
                    </li>
                    <li>
                        <div class="searchbar">
                            <input type="text" placeholder="Start your search" class="search_input"></input>
                            <button class="search_icon"><i class="fa fa-search"></i></button>
                        </div>
                    </li>
                </ul>
            </nav>
    </div>
</header>)
};

export default Header;

