import React from 'react';
import DistributionForm from "./components/DistributionForm";
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Cálculo de Distribuição Pathfinder 2E</h1>
      <DistributionForm />
    </div>
  );
};

export default App;
