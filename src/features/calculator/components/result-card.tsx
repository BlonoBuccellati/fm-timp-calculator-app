import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { useCalculatorContext } from "../context/tip-calculator-context";

interface CalculatedContainerProps {
  label: string;
  calculatedValue: string;
}
const CalculatedContainer = ({
  label,
  calculatedValue,
}: CalculatedContainerProps) => {
  return (
    <div className="flex items-center justify-between">
      <label>
        <span className="typo-5 block text-white">{label}</span>
        <span className="typo-6 text-grey-400 block">/ person</span>
      </label>
      {/* state */}
      <div className="typo-1 text-green-400">${calculatedValue}</div>
    </div>
  );
};

const ResultCard = () => {
  const { result, setters } = useCalculatorContext();
  const { tipAmount, totalPerPerson } = result;
  const { handleResetButtonClick } = setters;
  return (
    <Card className="desktop:space-y-1600 tablet:px-400 desktop:min-w-[413px] space-y-400 rounded-[15px] bg-green-900 p-300">
      <div className="space-y-300">
        <CalculatedContainer label="Tip Amount" calculatedValue={tipAmount} />
        <CalculatedContainer label="Total" calculatedValue={totalPerPerson} />
      </div>
      <Button
        variant="reset"
        className="uppercase"
        type="button"
        onClick={handleResetButtonClick}
      >
        Reset
      </Button>
    </Card>
  );
};

export default ResultCard;
