export interface CalculatorValueProps {
  bill: string;
  selectedTip: {
    value: string;
    isCustom: boolean;
  };
  people: string;
}

export interface CalculatorSettersProps {
  setSelectedTip: React.Dispatch<
    React.SetStateAction<{
      value: string;
      isCustom: boolean;
    }>
  >;
  handleBillInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePeopleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CalculatorErrorProps {
  billError: string;
  peopleError: string;
}

export interface ResultProps {
  tipAmount: string;
  totalPerPerson: string;
}
