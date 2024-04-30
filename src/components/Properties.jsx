// Properties.jsx
import React, { useState, useEffect } from "react";
import propertieslist from "../properties.json" ; 
import Property from "./Property";

const Properties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    setProperties(propertieslist)
  }, []);

  return (
    <div>
      <h1>Liste des propriétés</h1>
      {properties.map((property) => (
        <Property key={property.id} property={property} />
      ))}
    </div>
  );
};

export default Properties;
