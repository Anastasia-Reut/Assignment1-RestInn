import React, { useState,useEffect } from 'react';
import ResortItem from "./ResortItem";
import '../assets/css/ResortList.css'

const ResortList = (props) => {


  const [featured] = useState(props.featured)

  const [resorts , setResorts] = useState([]);

  const filteredResorts = resorts.filter( resort => {
    console.info(featured)
    if (featured) {
      return resort.featured
    }
    return true
  })

  const title = featured ? 'Bestsellers' : 'Resorts'

  useEffect(()=>{

    const URL = 'http://localhost:5000/resorts'
    //MAKE AN AJAX request

    fetch(URL)
    .then(response=>response.json())
    .then(json=>{
      setResorts(json)
    })
    .catch(err=>console.log(err))

  }, [])

  return (
    <section id="section-resort-list">
      <div className= "container">
          <h1>{title}</h1>
          <div className="resort-cards-wrapper">

          { filteredResorts.map( resort =>
              ( <ResortItem id={resort.id} title={resort.title} key={resort.id} image={resort.img} price={resort.price} />) )
          }

          </div>

      </div>

    </section>

  );
};

export default ResortList;
