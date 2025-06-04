"use client";

import Image from "next/image";
import { PropsWithChildren } from "react";

import { iconDollar, iconPerson } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useCalculatorContext } from "../context/tip-calculator-context";

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

interface FormFieldProps {
  title: string;
  state: string;
  error: string;
  iconSrc: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const FormField = ({
  title,
  state,
  error,
  iconSrc,
  onChange,
}: FormFieldProps) => {
  return (
    <label>
      <CalculatorFormField title={title} className="relative">
        <div className="relative">
          <Image
            alt=""
            src={iconSrc}
            className="absolute top-1/2 left-200 -translate-y-1/2"
          />
          <Input
            type="number"
            placeholder="0"
            className="px-200 py-100"
            id={title}
            value={state}
            onChange={onChange}
          />
        </div>
        {error && (
          <p className="absolute top-0 right-0 text-orange-400">{error}</p>
        )}
      </CalculatorFormField>
    </label>
  );
};

const SelectTipField = () => {
  const tipNumbers = [5, 10, 15, 25, 50];

  const { values, setters, errors } = useCalculatorContext();
  const { buttonTip, customTip } = values;
  const { handleTipButtonClick, handleCustomTipChange } = setters;
  const { tipError } = errors;
  return (
    <CalculatorFormField title="Select Tip %" className="relative">
      <div className="tablet:grid-cols-3 mx-auto grid grid-cols-2 gap-200">
        {tipNumbers.map((num) => {
          const isActive = Number(buttonTip) === num;
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
            value={customTip}
            onChange={handleCustomTipChange}
          />
          {tipError && (
            <p className="absolute top-0 right-0 text-orange-400">{tipError}</p>
          )}
        </label>
      </div>
    </CalculatorFormField>
  );
};

const CalculatorForm = () => {
  const { values, setters, errors } = useCalculatorContext();
  return (
    <div className="desktop:mx-0 desktop:my-auto mx-auto w-[95%] space-y-400">
      <FormField
        title="Bill"
        iconSrc={iconDollar}
        state={values.bill}
        onChange={setters.handleBillInputChange}
        error={errors.billError}
      />
      <SelectTipField />
      <FormField
        title="Number of People"
        iconSrc={iconPerson}
        state={values.people}
        onChange={setters.handlePeopleInputChange}
        error={errors.peopleError}
      />
    </div>
  );
};

export default CalculatorForm;
