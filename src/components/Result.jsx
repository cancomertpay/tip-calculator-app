import React, { useContext } from "react";
import { TipCalculatorContext } from "../store/TipCalculateContext";

function Result() {
  const { tipAmount, totalAmount, resetValues, error } =
    useContext(TipCalculatorContext);

  const hasError = Object.values(error).includes(true);

  return (
    <div className="result-card">
      <div className="result-inner">
        <div className="result-group-container">
          <div className="result-group">
            <div className="result-header">
              <h2>Tip Amount</h2>
              <p>/ person</p>
            </div>
            <p className="result">
              {hasError ? "0.00" : tipAmount !== "$NaN" ? tipAmount : "$0.00"}
            </p>
          </div>
          <div id="total" className="result-group">
            <div className="result-header">
              <h2>Total</h2>
              <p>/ person</p>
            </div>
            <p className="result">
              {hasError
                ? "$0.00"
                : totalAmount !== "$NaN"
                ? totalAmount
                : "$0.00"}
            </p>
          </div>
        </div>
        <div className="result-btn-container">
          <button onClick={resetValues} className="reset-button">
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result;
