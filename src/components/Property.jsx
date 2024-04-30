// Property.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
 import { addEvaluation } from '../redux/slices/propertySlice';

const Property = ({ property }) => {
  
  const [showEvaluationForm, setShowEvaluationForm] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const dispatch = useDispatch();

  const handleAddEvaluation = () => {
    setShowEvaluationForm(true);
  };
 

  const handleSubmitEvaluation = (event) => {
    event.preventDefault();
    dispatch(addEvaluation({ comment, rating }));
    console.log(comment) ;
    console.log(rating) ; 
    setComment('');
    setRating(1);
    setShowEvaluationForm(false);
  };


  return (
    <div className="property-card">
      <h2>{property.name}</h2>
      <p><strong>Gouvernorat:</strong> {property.governorate}</p>
      <p><strong>Adresse:</strong> {property.adress}</p>
      <p><strong>Prix:</strong> {property.price} DT </p>
       
    {property.available && (
        <Link to={`/rent/${property.id}`} className="rent-link">Rent</Link>
      )}
      <button onClick={handleAddEvaluation}>Ajouter une évaluation</button>
      {showEvaluationForm && (
        <form onSubmit={handleSubmitEvaluation}>
          <div>
            <label>Commentaire:</label>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
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
