// App.jsx
import React from 'react';
import {   Route,   Routes } from 'react-router-dom';
import "./App.css";
import ContractForm from './components/ContractForm';
import Properties from './components/Properties';

const App = () => {
  return (
    <Routes>
      <Route  path="/list" element={<Properties/>} />  
        <Route path="/rent/:id" element={<ContractForm/>} />
  </Routes>
  );
};

export default App;
