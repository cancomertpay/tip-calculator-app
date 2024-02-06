import { createContext, useEffect, useState } from "react";

export const TipCalculatorContext = createContext({
  setUserInputs: ({}) => {},
  userInputs: {},
  tipAmount: 0,
  totalAmount: 0,
  resetValues: () => {},
  error: {},
  setError: () => {},
});

export default function TipCalculatorProvider({ children }) {
  const [userInputs, setUserInputs] = useState({
    bill: "",
    tipPercentage: "",
    numberOfPeople: "",
  });

  const [inputError, setInputError] = useState({
    billErr: false,
    tipPercentageErr: false,
    numberOfPeopleErr: false,
  });

  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTip = () => {
    const billAmount = parseFloat(userInputs.bill);
    const tipPercentage = parseFloat(userInputs.tipPercentage); // Parse tipPercentage to float
    const numberOfPeople = parseFloat(userInputs.numberOfPeople); // Parse numberOfPeople to float
  
    // Check if the parsed values are valid numbers
    if (isNaN(billAmount) || isNaN(tipPercentage) || isNaN(numberOfPeople)) {
      // Handle invalid input, perhaps show an error message
      return;
    }
  
    const calculatedTip = (billAmount * (tipPercentage === 0 ? 0 : tipPercentage)) / 100;
    const calculatedTotal = billAmount + calculatedTip;
    const tipPerPerson = calculatedTip / (numberOfPeople === 0 ? 1 : numberOfPeople);
    const totalPerPerson = calculatedTotal / (numberOfPeople === 0 ? 1 : numberOfPeople);
  
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  
    setTipAmount(formatter.format(tipPerPerson));
    setTotalAmount(formatter.format(totalPerPerson));
  };

  useEffect(() => {
    calculateTip();
  }, [userInputs]);

  const resetValues = () => {
    setUserInputs({
      bill: "",
      tipPercentage: 0,
      numberOfPeople: "",
    });
  };

  const contextValue = {
    setUserInputs,
    userInputs,
    tipAmount,
    totalAmount,
    resetValues,
    error: inputError,
    setError: setInputError,
  };

  return (
    <TipCalculatorContext.Provider value={contextValue}>
      {children}
    </TipCalculatorContext.Provider>
  );
}
