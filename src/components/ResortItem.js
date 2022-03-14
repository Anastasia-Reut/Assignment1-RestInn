import React from 'react';
import { Link } from 'react-router-dom';

const ResortItem = ({id, title,image,price}) => {
  return  (

    <div className="resort-card">

      <Link to = {`/property/${id}`}>
          <div class="image" style={ { 'backgroundImage': 'url('+image+')' } } alt=""/>
      </Link>

      <div className="resortContent">
          <h3>{title}</h3>
          <div>${price} per night</div>
      </div>

  </div>

  );
};

export default ResortItem;
