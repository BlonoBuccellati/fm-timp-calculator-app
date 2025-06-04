export interface CalculatorValueProps {
  bill: string;
  customTip: string;
  buttonTip: string;
  people: string;
}

export interface CalculatorSettersProps {
  handleCustomTipChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleTipButtonClick: (value: number) => void;
  handleBillInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePeopleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CalculatorErrorProps {
  billError: string;
  tipError: string;
  peopleError: string;
}

export interface ResultProps {
  tipAmount: string;
  totalPerPerson: string;
}

export interface CalculatorContextType {
  values: CalculatorValueProps;
  errors: CalculatorErrorProps;
  setters: CalculatorSettersProps;
  result: ResultProps;
  // TODO:resetを追加
}
