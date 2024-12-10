import React, { useState } from "react";
import axios from "axios";

interface DistributionResult {
  critical_failures: number;
  failures: number;
  successes: number;
  critical_successes: number;
}

const DistributionForm: React.FC = () => {
  const [modifier, setModifier] = useState<string>("");
  const [dc, setDc] = useState<string>("");
  const [result, setResult] = useState<DistributionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateInputs = (): boolean => {
    if (!modifier || !dc || isNaN(Number(modifier)) || isNaN(Number(dc))) {
      setError("valores invalidos para dc e modifier, por favor passe valores numericos");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    try {
      setError(null);
      const response = await axios.get("http://localhost:8080/api/pathfinder2e/v1/distribution", {
        params: { modifier, dc },
      });
      console.log("response >> ", response.data);
      setResult(response.data);
    } catch (err) {
      console.error("erro >> ", err);
      setError("aconteceu um erro, tente novamente");
      setResult(null);
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="modifier">Modificador :</label>
          <input
            id="modifier"
            type="number"
            value={modifier}
            onChange={(e) => setModifier(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="dc">DC (Classe de Dificuldade):</label>
          <input
            id="dc"
            type="number"
            value={dc}
            onChange={(e) => setDc(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">
          Calcular
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {result && (
        <div className="results">
          <h2>Resultados</h2>
          <p>Falhas Críticas: {result.critical_failures}</p>
          <p>Falhas: {result.failures}</p>
          <p>Sucessos: {result.successes}</p>
          <p>Sucessos Críticos: {result.critical_successes}</p>
        </div>
      )}
    </div>
  );
};

export default DistributionForm;
