// Property.jsx
import React from 'react';
import { Link } from 'react-router-dom';
 

const Property = ({ property }) => {
  

  

  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p><strong>Gouvernorat:</strong> {property.governorate}</p>
      <p><strong>Adresse:</strong> {property.adress}</p>
      <p><strong>Prix:</strong> {property.price} DT </p>
       
    {property.available && (
        <Link to={`/rent/${property.id}`} className="rent-link">Rent</Link>
      )}
    </div>
  );
};

export default Property;
