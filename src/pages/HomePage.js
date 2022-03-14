import React from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import ResortList from "../components/ResortList";
import PropertyTypeSection from "../components/PropertyTypeSection";
import '../assets/css/HomePage.css'

const HomePage = () => {

  return (
    <>
      <Header/>
      <main>
        <Hero/>
        <PropertyTypeSection/>
        <ResortList featured={true}/>
      </main>
      <Footer/>
    </>
  )
}

export default HomePage