import React from 'react'

import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginForm from "../components/LoginForm";


const LoginPage = () => {
  return (
    <div className="grid grid-row-3" id="main-container">
    <Header/>
    <main>
        <LoginForm/>
    </main>
    <Footer/>
</div>
  )
}

export default LoginPage