import React, {useEffect} from 'react'
import Header from "../components/Header";
import Footer from "../components/Footer";
import ResortList from "../components/ResortList";
const ResortListingPage = () => {

  return (
    <div className="grid grid-row-3" id="main-container">

    <Header/>
    <main>
      <ResortList />
    </main>
    <Footer/>

</div>
  )
}

export default ResortListingPage