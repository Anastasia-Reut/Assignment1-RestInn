import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from '../pages/HomePage';
import AboutPage from "../pages/AboutPage"
import ResortListingPage from "../pages/ResortListingPage";
import LoginPage from "../pages/LoginPage";
import PropertyTypePage from "../pages/PropertyTypePage";
import RegistrationPage from "../pages/RegistrationPage";
import PropertyPage from "../pages/PropertyPage"

import '../assets/css/App.css';
import '../assets/css/utilities.css';


const App = () => 
{


  
 
  return (
    <div id="main-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage  />} />
          <Route path="/property-type/:id" element={<PropertyTypePage  />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="resorts" element={<ResortListingPage  />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
          <Route path="property/:id" element={<PropertyPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

