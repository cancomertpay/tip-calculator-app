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
    const calculatedTip = (billAmount * userInputs.tipPercentage === "" ? 0 : userInputs.tipPercentage) / 100;
    const calculatedTotal = billAmount + calculatedTip;
    const tipPerPerson =
      calculatedTip /
      (userInputs.numberOfPeople === "" ? 1 : userInputs.numberOfPeople);
    const totalPerPerson =
      calculatedTotal /
      (userInputs.numberOfPeople === "" ? 1 : userInputs.numberOfPeople);

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
