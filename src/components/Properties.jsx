import React, { useEffect, useState } from "react";
import Property from "./Property";
import { getallProperties } from "../service/api";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    minPrice: "",
    maxPrice: ""
  });

  useEffect(() => {
    const fetchProperties = async () => {
      const propertiesResult = await getallProperties();
      setProperties(propertiesResult.data);
    };
    fetchProperties();
  }, []);
 
  const handleSearchInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({ ...searchCriteria, [name]: value });
  };

  const filteredProperties = properties?.filter((property) => {
   
  
    const priceMatch =
      (searchCriteria.minPrice === "" || property.price >= parseInt(searchCriteria.minPrice, 10)) &&
      (searchCriteria.maxPrice === "" || property.price <= parseInt(searchCriteria.maxPrice, 10));

    return  priceMatch;
  });
 
  return (
    <div>
      <h1>Liste des propriétés</h1>
      <form>
        <input
          type="number"
          placeholder="Prix minimum"
          name="minPrice"
          value={searchCriteria.minPrice}
          onChange={handleSearchInputChange}
        />
        <input
          type="number"
          placeholder="Prix maximum"
          name="maxPrice"
          value={searchCriteria.maxPrice}
          onChange={handleSearchInputChange}
        />
      </form>
      <br/>
      {filteredProperties.map((property) => (
        <Property key={property.id} property={property} />
      ))}
    </div>
  );
};

export default Properties;
