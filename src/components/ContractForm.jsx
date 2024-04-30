// ContractForm.jsx
import React, { useEffect, useState } from "react";
import propertieslist from "../properties.json";
import { useNavigate, useParams } from "react-router-dom";
const ContractForm = () => {
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");

  const [submittedData, setSubmittedData] = useState(null); // State to hold submitted data

  const { id } = useParams();
  const property = propertieslist.find((p) => p.id == id);
  const navigate = useNavigate();
  const [redirect,setRedirect] = useState(false) ;  
  function updatePropertyAvailability(properties, propertyId) {
    const propertyIndex = properties.findIndex(
      (property) => property.id === propertyId
    );

    if (propertyIndex !== -1) {
      const updatedProperty = { ...properties[propertyIndex] };

      updatedProperty.available = false;

      const updatedProperties = [
        ...properties.slice(0, propertyIndex),
        updatedProperty,
        ...properties.slice(propertyIndex + 1),
      ];

      return updatedProperties;
    } else {
      console.error(
        `La propriété avec l'ID ${propertyId} n'a pas été trouvée.`
      );
      return properties;
    }
  }

  useEffect(() => {
      setTimeout(() => {
     
      navigate("/list");
    }, 30000);
  setRedirect(true) ; 
    
  }, [redirect]);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const contractData = {
      Name,
      Phone,
      startDate,
      duration,
    };
    console.log("Contrat soumis :", contractData);

    setSubmittedData(contractData);

    setName("");
    setPhone("");
    setStartDate("");
    setDuration("");
    setRedirect(true) ; 
    const updatedProperties = updatePropertyAvailability(
      propertieslist,
      property.id
    );
     /*
     TODO mise à jour avec axios  et redirect!!!
     */
 
    /* try {
        await editProperty(property.id, { ...property, available: false });
        console.log('Attribut "available" de la propriété mis à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la propriété:', error);
      }*/
  };

  return (
    <div className="contract-form">
      <h3>Contrat d'allocation</h3>
      <form onSubmit={handleSubmit}>
        <label>Nom du locataire :</label>
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Numéro de téléphone :</label>
        <input
          type="tel"
          value={Phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <label>Date de début de la location :</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label>Durée de la location (en jours) :</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />

        <button type="submit" >Valider</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h4>Récapitulatif du contrat :</h4>
          <p>
            Mr|Mme {submittedData.Name}, votre réservation pour la propriété{" "}
            {property.name} est confirmée pour un prix de{" "}
            {submittedData.duration * property.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContractForm;
