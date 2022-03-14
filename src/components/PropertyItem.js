import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/PropertyItem.scss';

const ResortItem = ( props ) => {

  const id = props.id
  const title = props.title
  const img = props.img
  const price = props.price
  const description = props.description
  const house_rules = props.house_rules
  const amenities = props.amenities
  const location = props.location
  const distance = props.distance
  const rating = props.rating

  return  (

    <Link to={ '/property/'+id } className="property-item">

      <div className="image" style={ { 'backgroundImage': 'url('+img+')' } } />
      <div className="property-details-wrapper">
          <h3>{title}</h3>
          <div>${price} per night</div>
          <div className="location">
            <h5 className="location-title">{location}</h5>
            <div className="distance">- {distance} to center</div>
          </div>
          <div className="rating-wrapper">
            <div className="rating">{rating}</div>
            Fabulous
            <div className="reviews">Based on 999 reviews of our visitors</div>
          </div>
          <div className="features-wrapper">
            { amenities.forEach( amenity =>
              ( <div className="amenity">{amenity}</div> )
            )}
          </div>
      </div>

  </Link>

  );
};

export default ResortItem;
