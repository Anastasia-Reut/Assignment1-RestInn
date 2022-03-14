import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/PropertyTypeItem.css'

const PropertyTypeItem = ({id, title, image, price}) => {
  return  (
    <Link className="property-type-card" to={`/property-type/${id}`}>
        <div style={{'backgroundImage': 'url('+image+')' }} alt=""/>
        <h5 className="property-type-title">{title}</h5>
    </Link>
  );
};

export default PropertyTypeItem;
