import { useState } from "react";

import { NonZeroNumberSchema } from "../lib/schemas";

const calculatedValue = (
  bill: string,
  people: string,
  selectedTip: string,
  isCustom: boolean,
) => {
  if (!bill || !people || !selectedTip) {
    const zero = 0;
    return { tipAmount: zero.toFixed(2), totalPerPerson: zero.toFixed(2) };
  }
  const tipAmount = calculateTipAmount(isCustom, selectedTip, bill);
  const totalPerPerson = tipAmount / Number(people);
  return {
    tipAmount: tipAmount.toFixed(2),
    totalPerPerson: totalPerPerson.toFixed(2),
  };
};
const calculateTipAmount = (
  isCustom: boolean,
  selectedTip: string,
  bill: string,
) => {
  if (isCustom) {
    console.log(Number(selectedTip));
    return Number(selectedTip) + Number(bill);
  } else {
    const tipPercent = Number(selectedTip);
    return Number(bill) * (1 + tipPercent / 100);
  }
};

export function useCalculator() {
  const [bill, setBill] = useState("");
  const [people, setPeople] = useState("");
  const [billError, setBillError] = useState("");
  const [peopleError, setPeopleError] = useState("");
  const [selectedTip, setSelectedTip] = useState({
    value: "",
    isCustom: false,
  });
  const [tipAmount, setTipAmount] = useState("0.00");
  const [totalPerPerson, setTotalPerPerson] = useState("0.00");

  const handleBillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBill(e.target.value);
    const validationField = NonZeroNumberSchema.safeParse({
      nonZeroNumber: Number(e.target.value),
    });
    if (validationField.success) {
      setBillError("");
    } else {
      const message = validationField.error.flatten().fieldErrors.nonZeroNumber;
      setBillError(message?.toString() ?? "");
    }
    const { tipAmount, totalPerPerson } = calculatedValue(
      e.target.value,
      people,
      selectedTip.value,
      selectedTip.isCustom,
    );
    console.log(tipAmount);
    setTipAmount(tipAmount);
    setTotalPerPerson(totalPerPerson);
  };

  const handlePeopleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPeople(e.target.value);

    const validationField = NonZeroNumberSchema.safeParse({
      nonZeroNumber: Number(e.target.value),
    });
    if (validationField.success) {
      setPeopleError("");
    } else {
      const message = validationField.error.flatten().fieldErrors.nonZeroNumber;
      setPeopleError(message?.toString() ?? "");
    }
    const { tipAmount, totalPerPerson } = calculatedValue(
      bill,
      e.target.value,
      selectedTip.value,
      selectedTip.isCustom,
    );
    setTipAmount(tipAmount);
    setTotalPerPerson(totalPerPerson);
  };

  return {
    values: { bill, people, selectedTip },
    setters: {
      setSelectedTip,
      handleBillInputChange,
      handlePeopleInputChange,
    },
    errors: {
      peopleError,
      billError,
    },
    result: {
      tipAmount,
      totalPerPerson,
    },
  };
}
