import React, { useState,useEffect } from 'react';
import PropertyTypeItem from "./PropertyTypeItem";
import '../assets/css/PropertyTypeSection.css'

const PropertyTypeSection = () => {

  const [property_types , setPropertyTypes] = useState([]);


  useEffect(()=>{

    const URL = 'http://localhost:5000/property_types'
    //MAKE AN AJAX request

    fetch(URL)
      .then(response=>response.json())
      .then(json=>{
        setPropertyTypes(json)
      })
      .catch(err=>console.log(err))

  }, [])


  return (
    <section id="property-type-section">
      <div className= "container">

        <h2>Property Types</h2>

        <div className="property-type-cards">

          { property_types.map( property_type =>
            ( <PropertyTypeItem id={property_type.id} title={property_type.title} key={property_type.id} image={property_type.img} />))
          }

        </div>

      </div>

    </section>

  );
};

export default PropertyTypeSection;
