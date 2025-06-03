"use client";

import Image from "next/image";
import { PropsWithChildren } from "react";

import { iconDollar, iconPerson } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useSelectedTip } from "../hooks/useSelectedTip";
import {
  CalculatorErrorProps,
  CalculatorSettersProps,
  CalculatorValueProps,
} from "../types/tip-calculator";

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
        <CalculatorFormFieldInput
          imageSrc={iconSrc}
          id={title}
          state={state}
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

interface CalculatorFormProps {
  values: CalculatorValueProps;
  setters: CalculatorSettersProps;
  errors: CalculatorErrorProps;
}
const CalculatorForm = ({ values, setters, errors }: CalculatorFormProps) => {
  return (
    <div className="desktop:mx-0 desktop:my-auto mx-auto w-[95%] space-y-400">
      <FormField
        title="Bill"
        iconSrc={iconDollar}
        state={values.bill}
        onChange={setters.handleBillInputChange}
        error={errors.billError}
      />
      <SelectTipField setSelectedTip={setters.setSelectedTip} />
      <FormField
        title="People"
        iconSrc={iconPerson}
        state={values.people}
        onChange={setters.handlePeopleInputChange}
        error={errors.peopleError}
      />
    </div>
  );
};
export default CalculatorForm;
