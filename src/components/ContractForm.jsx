// ContractForm.jsx
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { editProperty, getallProperties } from "../service/api";
const ContractForm = () => {
  const [property, setProperty] = useState({});
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  

  const [submittedData, setSubmittedData] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    const fetchProperties = async () => {
      const propertyResult = await getallProperties(id);
      setProperty(propertyResult.data);
    };
    fetchProperties();
  }, []);
  


  
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    const contractData = {
      Name,
      Phone,
      startDate,
      endDate,
    
    };
    console.log("Contrat soumis :", contractData);
    setSubmittedData(contractData);
    setName("");
    setPhone("");
    setStartDate("");
    setEndDate("");
    setRedirect(true) ; 
    
    
 
     try {
        await editProperty(property.id, { ...property, available: false , vue_number : +1 });
        console.log('Attribut "available" de la propriété mis à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour de la propriété:', error);
      }
  };

  return (
    <div className="contract-form">
      <h3>Réserver la propriéte avec ID: {id}</h3>
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
        <label>Date du fin de la location :</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
       
        <button type="submit" >Valider</button>
      </form>

      {submittedData && (
        <div className="submitted-data">
          <h4>Récapitulatif du Simulation du prix totale :</h4>
          <p>
            Mr|Mme {submittedData.Name}, votre réservation pour la propriété{" "}
            {property.name} est confirmée pour un prix de{" "}
            {Math.ceil((new Date(submittedData.endDate) - new Date(submittedData.startDate)) / (1000 * 60 * 60 * 24))* property.price}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContractForm;
