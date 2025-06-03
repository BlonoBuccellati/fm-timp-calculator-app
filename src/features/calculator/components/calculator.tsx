"use client";
import Image from "next/image";
import { PropsWithChildren } from "react";

import { iconDollar, iconPerson } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useCalculator } from "../hooks/useCalculator";

import ResultCard from "./result-card";

interface CalculatorFormFieldInputProps {
  imageSrc: string;
  state: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const CalculatorFormFieldInput = ({
  imageSrc,
  state,
  onChange,
  ...props
}: CalculatorFormFieldInputProps & React.ComponentProps<"input">) => {
  return (
    <div className="relative">
      <Image
        alt=""
        src={imageSrc}
        className="absolute top-1/2 left-200 -translate-y-1/2"
      />
      <Input
        type="number"
        placeholder="0"
        className="px-200 py-100"
        {...props}
        value={state}
        onChange={onChange}
      />
    </div>
  );
};

interface CalculatorFormFieldProps {
  title: string;
  className?: string;
}
const CalculatorFormField = ({
  title,
  className,
  children,
}: PropsWithChildren<CalculatorFormFieldProps>) => {
  return (
    <div className={cn("space-y-100", className)}>
      <p className="typo-5 text-grey-500 block">{title}</p>
      {children}
    </div>
  );
};

interface BillFieldProps {
  bill: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const BillField = ({ bill, error, onChange }: BillFieldProps) => {
  return (
    <label>
      <CalculatorFormField title="Bill" className="relative">
        <CalculatorFormFieldInput
          imageSrc={iconPerson}
          id="Bill"
          state={bill}
          onChange={onChange}
        />
        {error && (
          <p className="absolute top-0 right-0 text-orange-400">{error}</p>
        )}
      </CalculatorFormField>
    </label>
  );
};

interface SelectTipFieldProps {
  customTipDollar: string;
  error: string;
  handleTipButtonClick: (e: number) => void;
  selectedTip: number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SelectTipField = ({
  customTipDollar,
  handleTipButtonClick,
  error,
  selectedTip,
  onChange,
}: SelectTipFieldProps) => {
  const tipNumbers = [5, 10, 15, 25, 50];
  return (
    <CalculatorFormField title="Select Tip %" className="relative">
      <div className="tablet:grid-cols-3 mx-auto grid grid-cols-2 gap-200">
        {tipNumbers.map((num) => {
          const isActive = selectedTip === num;
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
            onChange={onChange}
          />
          {error && (
            <p className="absolute top-0 right-0 text-orange-400">{error}</p>
          )}
        </label>
      </div>
    </CalculatorFormField>
  );
};

interface NumberOfPeopleFieldProps {
  people: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const NumberOfPeopleField = ({
  people,
  error,
  onChange,
}: NumberOfPeopleFieldProps) => {
  return (
    <label>
      <CalculatorFormField title="Number of People" className="relative">
        <CalculatorFormFieldInput
          imageSrc={iconDollar}
          id="Number of People"
          state={people}
          onChange={onChange}
        />
        {error && (
          <p className="absolute top-0 right-0 text-orange-400">{error}</p>
        )}
      </CalculatorFormField>
    </label>
  );
};

const Calculator = () => {
  // 状態管理
  const {
    bill,
    handleBillInputChange,
    billError,
    handleTipCustomInputChange,
    customTipDollar,
    people,
    handlePeopleInputChange,
    peopleError,
    customTipError,
    handleTipButtonClick,
    selectedTip,
    tipAmount,
    totalPerPerson,
  } = useCalculator();

  return (
    <form className="tablet:py-600 tablet:px-1000 tablet:rounded-[25px] desktop:max-w-[920px] desktop:flex desktop:space-y-0 desktop:gap-600 desktop:p-400 mx-auto max-w-[608px] space-y-400 rounded-t-[25px] bg-white px-300 py-400">
      <div className="desktop:mx-0 desktop:my-auto mx-auto w-[95%] space-y-400">
        <BillField
          bill={bill}
          onChange={handleBillInputChange}
          error={billError}
        />
        <SelectTipField
          customTipDollar={customTipDollar}
          onChange={handleTipCustomInputChange}
          error={customTipError}
          selectedTip={selectedTip}
          handleTipButtonClick={handleTipButtonClick}
        />
        <NumberOfPeopleField
          people={people}
          onChange={handlePeopleInputChange}
          error={peopleError}
        />
      </div>
      <ResultCard tipAmount={tipAmount} totalPerPerson={totalPerPerson} />
    </form>
  );
};

export default Calculator;
