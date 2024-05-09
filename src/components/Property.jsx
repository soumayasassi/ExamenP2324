import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvaluation } from '../redux/slices/propertySlice';
import { Link } from 'react-router-dom';

const Property = ({ property }) => {
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();
  const [averageRating, setAverageRating] = useState(0); // New state variable
 const evaluations = useSelector(state => state.evaluation.evaluations);
 const [commentCount, setCommentCount] = useState(0);
  
  const handleAddEvaluation = () => {
    setShowEvaluationForm(true);
  };

  const handleSubmitEvaluation = (event) => {
    event.preventDefault();
    console.log("Rating:", rating);
    dispatch(addEvaluation({ propertyId: property.id, evaluation: { rating: parseInt(rating) } }));
  };

  useEffect(() => {
    const propertyEvaluations = evaluations.filter(evaluation => evaluation.propertyId === property.id);
    const totalRating = propertyEvaluations.reduce((total, evaluation) => total + Number(evaluation.evaluation.rating), 0); 
   
    setAverageRating(propertyEvaluations.length ? totalRating / propertyEvaluations.length : 0); 
    if (averageRating >= 4.5) {
      alert('Propriété excellente !');
    }
    setCommentCount(propertyEvaluations.length);
  }, [evaluations, property.id]);

 

  return (
    <div className="property-card">
     {/* <h2>Moyenne des notes: {averageRating}</h2>  */}
      <h2>{property.name}</h2>
      <p><strong>Adresse:</strong> {property.adress}</p>
      <p><strong>Prix:</strong> {property.price} DT </p>
      <p><strong>Nombre de Vue:</strong> {property.vue_number} </p>
      {/* <button onClick={handleAddEvaluation}>Ajouter une évaluation</button> */}
      {property.available && (
        <Link to={`/rent/${property.id}`} >Réserver la propriété</Link>
      )}
      {showEvaluationForm && (
        <form onSubmit={handleSubmitEvaluation}>
          <div>
            <label>Note:</label>
            <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>{value}</option>
              ))}
            </select>
          </div>
          <button type="submit">Ajouter</button>
        </form>
      )}
    </div>
  );
};

export default Property;
