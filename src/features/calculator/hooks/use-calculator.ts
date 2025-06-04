import { useEffect, useState } from "react";

import { calculatedValue } from "../lib/utils/calculate-value";
import { validationTipCalculator } from "../lib/utils/validate-tip-calculator";
import {
  CalculatorErrorProps,
  CalculatorSettersProps,
  CalculatorValueProps,
  ResultProps,
} from "../types/tip-calculator";

export function useCalculator() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [customTip, setCustomTip] = useState("");
  const [buttonTip, setButtonTip] = useState("");
  const [errors, setErrors] = useState<CalculatorErrorProps>({
    billError: "",
    tipError: "",
    peopleError: "",
  });

  const [tipAmount, setTipAmount] = useState("0.00");
  const [totalPerPerson, setTotalPerPerson] = useState("0.00");

  const handleBillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bill = e.target.value;
    setBill(bill);
    const errors = validationTipCalculator({ bill });
    setErrors((prev) => ({ ...prev, billError: errors.billError }));
  };

  const handlePeopleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numPeople = e.target.value;
    setPeople(numPeople);
    const errors = validationTipCalculator({ people: numPeople });
    setErrors((prev) => ({ ...prev, peopleError: errors.peopleError }));
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customTip = e.target.value;
    setCustomTip(customTip);
    setButtonTip("");
    const errors = validationTipCalculator({ customTip, buttonTip });
    setErrors((prev) => ({ ...prev, tipError: errors.tipError }));
  };

  const handleTipButtonClick = (value: number) => {
    const tip = value.toString();
    setCustomTip("");
    setButtonTip(tip);
    const errors = validationTipCalculator({ customTip, buttonTip: tip });
    setErrors((prev) => ({ ...prev, tipError: errors.tipError }));
  };

  const handleResetButtonClick = () => {
    setBill("");
    setButtonTip("");
    setCustomTip("");
    setPeople("");
  };

  // 計算する。
  useEffect(() => {
    const { tipAmount, totalPerPerson } = calculatedValue(
      bill,
      people,
      customTip,
      buttonTip,
    );
    setTipAmount(tipAmount);
    setTotalPerPerson(totalPerPerson);
  }, [bill, people, customTip, buttonTip]);

  const values: CalculatorValueProps = {
    bill,
    people,
    buttonTip,
    customTip,
  };
  const setters: CalculatorSettersProps = {
    handleCustomTipChange,
    handleTipButtonClick,
    handleBillInputChange,
    handlePeopleInputChange,
    handleResetButtonClick,
  };

  const result: ResultProps = {
    tipAmount,
    totalPerPerson,
  };
  return {
    values,
    setters,
    errors,
    result,
  };
}
