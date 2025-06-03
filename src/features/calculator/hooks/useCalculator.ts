import { useState } from "react";

import { NonZeroNumberSchema } from "../lib/schemas";

const calculatedValue = (
  bill: string,
  people: string,
  selectedTip: number | null,
  customTip: string,
) => {
  if (!bill || !people || (!selectedTip && !customTip)) {
    const zero = 0;
    return { tipAmount: zero.toFixed(2), totalPerPerson: zero.toFixed(2) };
  }
  const tipAmount = calculateTipAmount(customTip, selectedTip, bill);
  const totalPerPerson = tipAmount / Number(people);
  return {
    tipAmount: tipAmount.toFixed(2),
    totalPerPerson: totalPerPerson.toFixed(2),
  };
};
const calculateTipAmount = (
  customTip: string,
  selectedTip: number | null,
  bill: string,
) => {
  if (customTip) {
    console.log(Number(customTip));
    return Number(customTip) + Number(bill);
  } else {
    const tipPercent = Number(selectedTip);
    return Number(bill) * (1 + tipPercent / 100);
  }
};

export function useCalculator() {
  const [bill, setBill] = useState("");
  const [customTipDollar, setCustomTipDollar] = useState("");
  const [people, setPeople] = useState("");
  const [billError, setBillError] = useState("");
  const [peopleError, setPeopleError] = useState("");
  const [customTipError, setCustomTipError] = useState("");
  const [selectedTip, setSelectedTip] = useState<number | null>(null);
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
      selectedTip,
      customTipDollar,
    );
    console.log(tipAmount);
    setTipAmount(tipAmount);
    setTotalPerPerson(totalPerPerson);
  };
  const handleTipCustomInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomTipDollar(e.target.value);
    setSelectedTip(null);

    const validationField = NonZeroNumberSchema.safeParse({
      selectTip: Number(e.target.value),
    });
    if (validationField.success) {
      setCustomTipError("");
    } else {
      const message = validationField.error.flatten().fieldErrors.selectTip;
      setCustomTipError(message?.toString() ?? "");
    }
    const { tipAmount, totalPerPerson } = calculatedValue(
      bill,
      people,
      selectedTip,
      e.target.value,
    );
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
      selectedTip,
      customTipDollar,
    );
    setTipAmount(tipAmount);
    setTotalPerPerson(totalPerPerson);
  };

  const handleTipButtonClick = (percentage: number) => {
    setCustomTipDollar("");
    setCustomTipError("");
    const { tipAmount, totalPerPerson } = calculatedValue(
      bill,
      people,
      percentage,
      customTipDollar,
    );
    setTipAmount(tipAmount);
    setTotalPerPerson(totalPerPerson);
    setSelectedTip(percentage);
  };

  return {
    bill,
    handleBillInputChange,
    customTipDollar,
    handleTipCustomInputChange,
    people,
    handlePeopleInputChange,
    peopleError,
    billError,
    customTipError,
    handleTipButtonClick,
    selectedTip,
    tipAmount,
    totalPerPerson,
  };
}
