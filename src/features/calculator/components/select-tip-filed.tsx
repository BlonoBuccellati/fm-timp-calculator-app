import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useSelectedTip } from "../hooks/useSelectedTip";

import CalculatorFormField from "./ui/calculator-form-filed";

interface SelectTipFieldProps {
  setSelectedTip: React.Dispatch<
    React.SetStateAction<{ value: string; isCustom: boolean }>
  >;
}
const SelectTipField = ({ setSelectedTip }: SelectTipFieldProps) => {
  const tipNumbers = [5, 10, 15, 25, 50];

  const {
    selectedTipPercent,
    handleTipButtonClick,
    customTipDollar,
    handleChangeInputTipDollar,
    customTipError,
  } = useSelectedTip(setSelectedTip);
  return (
    <CalculatorFormField title="Select Tip %" className="relative">
      <div className="tablet:grid-cols-3 mx-auto grid grid-cols-2 gap-200">
        {tipNumbers.map((num) => {
          const isActive = Number(selectedTipPercent) === num;
          return (
            <Button
              type="button"
              key={num}
              onClick={() => handleTipButtonClick(num)}
              className={cn(isActive && "bg-green-200 text-green-900")}
            >
              {num}%
            </Button>
          );
        })}
        <label>
          <Input
            placeholder="Custom"
            className="placeholder:text-center"
            type="number"
            value={customTipDollar}
            onChange={handleChangeInputTipDollar}
          />
          {customTipError && (
            <p className="absolute top-0 right-0 text-orange-400">
              {customTipError}
            </p>
          )}
        </label>
      </div>
    </CalculatorFormField>
  );
};

export default SelectTipField;
