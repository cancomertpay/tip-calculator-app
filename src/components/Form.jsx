import React, { useContext, useEffect, useState } from "react";
import dollarIcon from "../assets/images/icon-dollar.svg";
import personIcon from "../assets/images/icon-person.svg";
import { TipCalculatorContext } from "../store/TipCalculateContext";

function Form() {
  const { userInputs, setUserInputs, error, setError } =
    useContext(TipCalculatorContext);

  const handleChange = (e) => {
    let newValue = e.target.value;

    if (isNaN(newValue) || +newValue < 0) {
      return;
    }

    switch (e.target.id) {
      case "bill":
        setUserInputs((prev) => ({
          ...prev,
          bill: newValue,
        }));
        setError((prev) => ({
          ...prev,
          billErr: false,
        }));
        break;

      case "customTip":
        setUserInputs((prev) => ({
          ...prev,
          tipPercentage: newValue,
        }));
        setError((prev) => ({
          ...prev,
          tipPercentageErr: false,
        }));
        break;

      case "numberOfPeople":
        setUserInputs((prev) => ({
          ...prev,
          numberOfPeople: newValue,
        }));
        setError((prev) => ({
          ...prev,
          numberOfPeopleErr: false,
        }));
        break;

      default:
        break;
    }
  };

  const handleBlur = (fieldId) => {
    // error handlers

    // bill input error handler
    if (fieldId === "bill") {
      if (userInputs.bill === "") {
        setError((prev) => ({
          ...prev,
          billErr: true,
        }));
      }
    }

    // tip percentage error handler
    if (fieldId === "tipPercentage") {
      if (userInputs.tipPercentage === 0 || userInputs.tipPercentage === "") {
        setError((prev) => ({
          ...prev,
          tipPercentageErr: true,
        }));
      }
    }

    // Number of people error handler
    if (fieldId === "numberOfPeople") {
      if (userInputs.numberOfPeople === 0 || userInputs.numberOfPeople === "") {
        setError((prev) => ({
          ...prev,
          numberOfPeopleErr: true,
        }));
      }
      if (
        userInputs.numberOfPeople > 0 &&
        (userInputs.tipPercentage === 0 || userInputs.tipPercentage === "")
      ) {
        setError((prev) => ({
          ...prev,
          tipPercentageErr: true,
        }));
      }
    }
  };
  return (
    <form>
      <section className="bill-form">
        <div className="label-group">
          <label htmlFor="bill">Bill</label>
          {error.billErr && (
            <p className="error-msg">Can't be zero or empty</p>
          )}
        </div>
        <div className="input-container">
          <span className="input-icon">
            <img src={dollarIcon} alt="icon-dollar" />
          </span>
          <input
            className={`input ${error.billErr ? "error" : ""}`}
            value={userInputs.bill}
            type="number"
            name="bill"
            id="bill"
            onBlur={() => handleBlur("bill")}
            onChange={handleChange}
          />
        </div>
      </section>

      <section className="select-tip-form">
        <div className="label-group">
          <label htmlFor="tip-percent">Select Tip %</label>
          {error.tipPercentageErr && (
            <p className="error-msg">Select a percentage</p>
          )}
        </div>
        <div className="input-container">
          <div className="input-column">
            <div
              onBlur={() => handleBlur("tipPercentage")}
              onClick={() => {
                setUserInputs((prev) => ({ ...prev, tipPercentage: 5 }));
                setError((prev) => ({ ...prev, tipPercentageErr: false }));
              }}
              id="5%"
              onChange={handleChange}
              className={`option-item ${error.tipPercentageErr ? "error" : ""}`}
            >
              5%
            </div>
            <div
              onBlur={() => handleBlur("tipPercentage")}
              onClick={() => {
                setUserInputs((prev) => ({ ...prev, tipPercentage: 15 }));
                setError((prev) => ({ ...prev, tipPercentageErr: false }));
              }}
              id="15%"
              onChange={handleChange}
              className={`option-item ${error.tipPercentageErr ? "error" : ""}`}
            >
              15%
            </div>
            <div
              onBlur={() => handleBlur("tipPercentage")}
              onClick={() => {
                setUserInputs((prev) => ({ ...prev, tipPercentage: 50 }));
                setError((prev) => ({ ...prev, tipPercentageErr: false }));
              }}
              id="50%"
              onChange={handleChange}
              className={`option-item ${error.tipPercentageErr ? "error" : ""}`}
            >
              50%
            </div>
          </div>
          <div className="input-column">
            <div
              onBlur={() => handleBlur("tipPercentage")}
              onClick={() =>{
                setUserInputs((prev) => ({ ...prev, tipPercentage: 10 }))
                setError(prev => ({...prev, tipPercentageErr: false}))
              }
              }
              id="10%"
              onChange={handleChange}
              className={`option-item ${error.tipPercentageErr ? "error" : ""}`}
            >
              10%
            </div>
            <div
              onBlur={() => handleBlur("tipPercentage")}
              onClick={() =>{
                setUserInputs((prev) => ({ ...prev, tipPercentage: 25 }))
                setError(prev => ({...prev, tipPercentageErr: false}))
              }
              }
              id="25%"
              onChange={handleChange}
              className={`option-item ${error.tipPercentageErr ? "error" : ""}`}
            >
              25%
            </div>
            <input
              onBlur={() => handleBlur("tipPercentage")}
              value={userInputs.tipPercentage}
              onChange={handleChange}
              className={`option-item tip-form-input ${
                error.tipPercentageErr ? "error" : ""
              }`}
              type="number"
              name="customTip"
              id="customTip"
              placeholder="Custom"
            />
          </div>
        </div>
      </section>

      <section className="people-count">
        <div className="label-group">
          <label htmlFor="numberOfPeople">Number of People</label>
          {error.numberOfPeopleErr && (
            <p className="error-msg">Can't be zero or empty</p>
          )}
        </div>
        <div className="input-container">
          <span className="input-icon">
            <img src={personIcon} alt="icon-dollar" />
          </span>
          <input
            className={`input ${error.numberOfPeopleErr ? "error" : ""}`}
            onBlur={() => handleBlur("numberOfPeople")}
            value={userInputs.numberOfPeople}
            onChange={handleChange}
            type="number"
            name="numberOfPeople"
            id="numberOfPeople"
          />
        </div>
      </section>
    </form>
  );
}

export default Form;
