import React, { useState } from "react";
import propertieslist from "../properties.json";
import Property from "./Property";

const Properties = () => {
  const [filteredProperties, setFilteredProperties] = useState(propertieslist);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  const handleFilterClick = () => {
    let filtered = propertieslist.filter((property) => {
      const propertyPrice = property.price;
      if ((minPrice && propertyPrice < minPrice) || (maxPrice && propertyPrice > maxPrice)) {
        return false;
      }
      return true;
    });
    setFilteredProperties(filtered);
  };

  return (
    <div>
      <h1>Liste des propriétés</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Prix minimum:
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(parseInt(e.target.value))}
          />
        </label>
        <label>
          Prix maximum:
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          />
        </label>
        <button type="button" onClick={handleFilterClick}>
          Filtrer
        </button>
      </form>
      
      {filteredProperties.map((property) => (
        <Property key={property.id} property={property} />
      ))}
    </div>
  );
};

export default Properties;
