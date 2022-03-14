import React, { useState,useEffect } from 'react'
import Header from '../components/Header';
import Footer  from '../components/Footer';
import { useParams } from 'react-router-dom';
import '../assets/css/PropertyDetails.scss'

const PropertyPage = () => {

  const [p,setResort]=  useState({
    amenities: []
  })

  const {id} = useParams()

  useEffect(()=>{

    const URL = `http://localhost:5000/resorts/${id}`

    fetch(URL) // GET
    .then(response=>response.json())
    .then(json=>{
      setResort(json)
    })
    .catch(err=>console.log(err))

 },[])

  return (
    <div className="grid grid-row-3" id="main-container">

    <Header/>
    <main>
      <div id="property" className="container layout">
        <div className="property-header">
          <div className="title-wrapper">
            <h2>{p.title} <span>3 star</span></h2>
            <div className="description">{p.description}</div>
          </div>
          <div className="controls-wrapper">
            <div className="price">${p.price} CAD</div>
            <div>
              <button>CHOOSE ROOM</button>
            </div>
          </div>
        </div>
        <div className="property-body">
          <div className="image" style={ { 'backgroundImage': 'url('+p.img+')' } }/>
          <div className="property-details-wrapper">
            <div className="map">

            </div>
            <div className="location">
              <h5 className="location-title">{p.location}</h5>
              <div className="distance">- {p.distance} to center</div>
            </div>
            <div className="rules">
              {p.house_rules}
            </div>
            <div className="rating-wrapper">
              <div className="rating">{p.rating}</div>
              Fabulous
              <div className="reviews">Based on 999 reviews of our visitors</div>
            </div>
            <div className="features-wrapper">
              { p.amenities.forEach( amenity =>
                ( <div className="amenity">{amenity}</div> )
              )}
            </div>
          </div>
        </div>
        <div className="property-footer">
          <h4>Guests rated location</h4>
          <div className="rates-wrapper">
            <div className="rate-wrapper">
              <div className="rating">5</div>
              <div className="reviewer">Joann</div>
              <div className="review">This is a nice place...</div>
            </div>
            <div className="rate-wrapper">
              <div className="rating">4</div>
              <div className="reviewer">John</div>
              <div className="review">I was very happy on my vacation in...</div>
            </div>
            <div className="rate-wrapper">
              <div className="rating">5</div>
              <div className="reviewer">Mary</div>
              <div className="review">Unfortunately, I can't...</div>
            </div>
            <div className="rate-wrapper">
              <div className="rating bad">2</div>
              <div className="reviewer">Joe</div>
              <div className="review">DO NOT read others! This is the only honest review...</div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer/>

</div>
  )
}

export default PropertyPage