import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../assets/css/PropertyTypePage.scss'
import PropertyItem from "../components/PropertyItem";
const PropertyTypePage = () => {

  const [properties, setProperties] = useState([])
  const [property_types, setPropertyTypes] = useState([])
  const [property_name, setPropertyName] = useState('')

  let { id } = useParams();
  id = parseInt(id);

  const doNothing = () => {}

  useEffect( () => {
    const URL = 'http://localhost:5000/resorts'

    fetch(URL)
      .then( response => response.json() )
      .then( properties => {
        const filteredProperties = properties.filter( ( p) => {
          p.property_type_id = parseInt(p.property_type_id)
          return p.property_type_id == id
        })
        setProperties(filteredProperties)
      })
      .catch(err=>console.log(err))

  }, [id])


  useEffect(()=>{

    const URL = 'http://localhost:5000/property_types'

    fetch(URL)
      .then(response=>response.json())
      .then(data=>{
        const property_types = data
        setPropertyTypes(property_types)

        console.info(property_types, id)
        const property = property_types.find( (p) => {
          if (p.id == id)
            return p
        })
        setPropertyName(property.title)
      })
      .catch(err=>console.log(err))

  }, [])

  return (
    <>
      <Header/>
      <main>
        <div className="container">
          <div className="property-listing-wrapper">
            <div className="controls">
              <div className="map">Map</div>
              <div className="results-summary">
                <h5>We have found</h5>
                <div>{properties.length} {property_name}</div>
              </div>
              <div className="name-search-wrapper">
                <h5>Name contains</h5>
                <div>
                  <input type="text" value="" placeholder="Name contains..." className="name-search" onChange={doNothing} />
                </div>
              </div>
              <div className="filters-wrapper">
                <h5>Popular Filters</h5>
                <label><input type="checkbox" />Pool</label>
                <label><input type="checkbox" />Breakfast Included</label>
                <label><input type="checkbox" />Wifi Included</label>
                <label><input type="checkbox" />Parking</label>
                <label><input type="checkbox" />Airport Transfers</label>
              </div>
              <div className="price-range-wrapper">
                <span>$0 CAD</span> - <span>$500 CAD</span>
              </div>
            </div>
            <div className="listing">
              <div className="location-title-wrapper">
                <h2>Bon accord village</h2>
              </div>
              <div className="sort-controls-wrapper">
                <div className="sort-by-text">Sort by</div>
                <div className="button-wrapper">
                  <button className="selected">Featured</button>
                </div>
                <div className="button-wrapper">
                  <button className="selected">Star rating</button>
                </div>
                <div className="button-wrapper">
                  <button className="selected">Distance</button>
                </div>
                <div className="button-wrapper">
                  <button className="selected">Guest rating</button>
                </div>
                <div className="button-wrapper">
                  <button className="selected">Price</button>
                </div>
              </div>
              <div className="disclaimer-wrapper">
                How much we get paid influences sort order
              </div>
              <div className="properties-wrapper">
                { properties.map( (p,i) => {
                  return (<PropertyItem
                      id={p.id}
                      key={i}
                      title={p.title}
                      img={p.img}
                      price={p.price}
                      description={p.description}
                      house_rules={p.house_rules}
                      amenities={p.amenities}
                      location={p.location}
                      distance={p.distance}
                      rating={p.rating}
                    />
                  )}
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </>
  )
}

export default PropertyTypePage