"use client";

import Image from "next/image";

import { iconDollar, iconPerson } from "@/assets/images";
import TypographyError from "@/components/typography-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useCalculatorContext } from "../context/tip-calculator-context";

import CalculatorFieldTitle from "./ui/calculator-filed-title";

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
    <div className="relative space-y-100">
      <CalculatorFieldTitle asChild>
        <label htmlFor={title}>{title}</label>
      </CalculatorFieldTitle>
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
        <TypographyError className="absolute top-0 right-0" asChild>
          <label htmlFor="">{error}</label>
        </TypographyError>
      )}
    </div>
  );
};

const SelectTipField = () => {
  const tipNumbers = [5, 10, 15, 25, 50];

  const { values, setters, errors } = useCalculatorContext();
  const { buttonTip, customTip } = values;
  const { handleTipButtonClick, handleCustomTipChange } = setters;
  const { tipError } = errors;
  return (
    <div className="relative space-y-100">
      <CalculatorFieldTitle asChild>
        <label>Select Tip %</label>
      </CalculatorFieldTitle>
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
            className="py-[6px] placeholder:text-center"
            type="number"
            value={customTip}
            onChange={handleCustomTipChange}
          />
          {tipError && (
            <TypographyError className="absolute top-0 right-0">
              {tipError}
            </TypographyError>
          )}
        </label>
      </div>
    </div>
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
