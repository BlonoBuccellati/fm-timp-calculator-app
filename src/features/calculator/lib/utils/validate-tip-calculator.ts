import {
  CalculatorErrorProps,
  CalculatorValueProps,
} from "../../types/tip-calculator";
import {
  TipCalculatorType,
  tipCalculatorSchema,
} from "../schemas/tip-calculator-schema";

export function validationTipCalculator(
  rowValues: Partial<Record<keyof CalculatorValueProps, string>>,
): CalculatorErrorProps {
  // バリデーション
  const validationValues: TipCalculatorType = {
    bill: rowValues.bill ?? "",
    numPeople: rowValues.people ?? "",
    selectedTip: (rowValues.buttonTip || rowValues.customTip) ?? "",
  };
  const result = tipCalculatorSchema.safeParse(validationValues);
  const errorMessages = result.error?.formErrors.fieldErrors ?? {};
  console.log(errorMessages.selectedTip?.[0] ?? "");
  return {
    billError: errorMessages.bill?.[0] ?? "",
    tipError: errorMessages.selectedTip?.[0] ?? "",
    peopleError: errorMessages.numPeople?.[0] ?? "",
  };
}
