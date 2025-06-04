import { ResultProps } from "../../types/tip-calculator";

export function calculatedValue(
  bill: string,
  people: string,
  customTip: string,
  buttonTip: string,
): ResultProps {
  const selectedTip = customTip || buttonTip;
  if (!bill || !people || !selectedTip) {
    const zero = 0;
    return { tipAmount: zero.toFixed(2), totalPerPerson: zero.toFixed(2) };
  }

  const isCustom = Boolean(customTip);
  const tipAmount = calculateTipAmount(isCustom, selectedTip, bill);
  const totalPerPerson = tipAmount / Number(people);
  return {
    tipAmount: tipAmount.toFixed(2),
    totalPerPerson: totalPerPerson.toFixed(2),
  };
}
const calculateTipAmount = (
  isCustom: boolean,
  selectedTip: string,
  bill: string,
) => {
  return isCustom
    ? Number(selectedTip) + Number(bill)
    : Number(bill) * (1 + Number(selectedTip) / 100);
};
