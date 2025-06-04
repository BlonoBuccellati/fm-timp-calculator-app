"use client";

import Image from "next/image";

import { iconDollar, iconPerson } from "@/assets/images";
import TypographyError from "@/components/typography-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { useCalculatorContext } from "../context/tip-calculator-context";

import CalculatorFormFieldLabel from "./ui/calculator-form-filed-label";

interface NumberInputWithIconFieldProps {
  title: string;
  id: string;
  value: string;
  error: string;
  iconSrc: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const NumberInputWithIconField = ({
  title,
  id,
  value,
  error,
  iconSrc,
  onChange,
}: NumberInputWithIconFieldProps) => {
  return (
    <div className="relative space-y-100">
      <CalculatorFormFieldLabel htmlFor={id}>{title}</CalculatorFormFieldLabel>
      <div className="relative">
        <Image
          alt=""
          src={iconSrc}
          className="absolute top-1/2 left-200 -translate-y-1/2"
        />
        <Input
          type="number"
          placeholder="0"
          className={cn(
            "px-200 py-100",
            error && "outline-2 outline-orange-400 focus:outline-orange-400",
          )}
          id={id}
          value={value}
          onChange={onChange}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={Boolean(error)}
        />
      </div>
      {error && (
        <TypographyError id={`${id}-error`} className="absolute top-0 right-0">
          {error}
        </TypographyError>
      )}
    </div>
  );
};

interface ButtonGroupProps {
  buttonTip: string;
  handleTipButtonClick: (value: number) => void;
}
const ButtonGroup = ({ buttonTip, handleTipButtonClick }: ButtonGroupProps) => {
  const tipNumbers = [5, 10, 15, 25, 50];

  return (
    <>
      {tipNumbers.map((num) => {
        const isActive = Number(buttonTip) === num;
        return (
          <Button
            type="button"
            key={num}
            onClick={() => handleTipButtonClick(num)}
            className={cn(isActive && "bg-green-200 text-green-900")}
            aria-pressed={isActive}
          >
            {num}%
          </Button>
        );
      })}
    </>
  );
};

const SelectTipField = () => {
  const { values, setters, errors } = useCalculatorContext();
  const { buttonTip, customTip } = values;
  const { handleTipButtonClick, handleCustomTipChange } = setters;
  const { tipError } = errors;
  const id = "tip";
  return (
    <fieldset>
      <div className="relative block space-y-100">
        <CalculatorFormFieldLabel asChild>
          <legend>Select Tip %</legend>
        </CalculatorFormFieldLabel>
        <div
          className="tablet:grid-cols-3 mx-auto grid grid-cols-2 gap-200"
          aria-describedby={tipError ? `${id}-error` : undefined}
        >
          <ButtonGroup
            buttonTip={buttonTip}
            handleTipButtonClick={handleTipButtonClick}
          />
          <Input
            placeholder="Custom"
            className={cn(
              "placeholder-grey-550 py-[6px] placeholder:text-center",
              tipError &&
                "outline-2 outline-orange-400 focus:outline-orange-400",
            )}
            type="number"
            value={customTip}
            onChange={handleCustomTipChange}
          />
          {tipError && (
            <TypographyError
              id={`${id}-error`}
              className="absolute top-0 right-0"
            >
              {tipError}
            </TypographyError>
          )}
        </div>
      </div>
    </fieldset>
  );
};

const CalculatorForm = () => {
  const { values, setters, errors } = useCalculatorContext();
  return (
    <div className="desktop:mx-0 desktop:my-auto mx-auto w-[95%] space-y-400">
      <NumberInputWithIconField
        title="Bill"
        id="bill"
        iconSrc={iconDollar}
        value={values.bill}
        onChange={setters.handleBillInputChange}
        error={errors.billError}
      />
      <SelectTipField />
      <NumberInputWithIconField
        title="Number of People"
        id="number-of-people"
        iconSrc={iconPerson}
        value={values.people}
        onChange={setters.handlePeopleInputChange}
        error={errors.peopleError}
      />
    </div>
  );
};

export default CalculatorForm;
