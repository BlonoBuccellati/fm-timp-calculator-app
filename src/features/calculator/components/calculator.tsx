import Image from "next/image";
import { PropsWithChildren } from "react";

import { iconDollar, iconPerson } from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import ResultCard from "./result-card";

interface CalculatorFormFieldInputProps {
  src: string;
}
const CalculatorFormFieldInput = ({
  src,
  ...props
}: CalculatorFormFieldInputProps & React.ComponentProps<"input">) => {
  return (
    <div className="relative">
      <Image
        alt=""
        src={src}
        className="absolute top-1/2 left-200 -translate-y-1/2"
      />
      <Input placeholder="0" className="px-200 py-100" {...props} />
    </div>
  );
};

interface CalculatorFormFieldProps {
  label: string;
}
const CalculatorFormField = ({
  label,
  children,
}: PropsWithChildren<CalculatorFormFieldProps>) => {
  return (
    <div className="space-y-100">
      <label className="typo-5 text-grey-500 block" htmlFor={label}>
        {label}
      </label>
      {children}
    </div>
  );
};

const BillField = () => {
  return (
    <CalculatorFormField label="Bill">
      <CalculatorFormFieldInput src={iconPerson} id="Bill" />
    </CalculatorFormField>
  );
};
interface TipButton {
  num: number;
}
const TipButton = ({ num }: TipButton) => {
  return <Button>{num}%</Button>;
};
const SelectTipField = () => {
  return (
    <CalculatorFormField label="Select Tip %">
      <div className="tablet:grid-cols-3 mx-auto grid grid-cols-2 gap-200">
        <TipButton num={5} />
        <TipButton num={10} />
        <TipButton num={15} />
        <TipButton num={25} />
        <TipButton num={50} />
        <Input placeholder="Custom" className="placeholder:text-center" />
      </div>
    </CalculatorFormField>
  );
};

const NumberOfPeopleField = () => {
  return (
    <CalculatorFormField label="Number of People">
      <CalculatorFormFieldInput src={iconDollar} id="Number of People" />
    </CalculatorFormField>
  );
};

const Calculator = () => {
  return (
    <form className="tablet:py-600 tablet:px-1000 tablet:rounded-[25px] desktop:max-w-[920px] desktop:flex desktop:space-y-0 desktop:gap-600 desktop:p-400 mx-auto max-w-[608px] space-y-400 rounded-t-[25px] bg-white px-300 py-400">
      <div className="desktop:mx-0 desktop:my-auto mx-auto w-[95%] space-y-400">
        <BillField />
        <SelectTipField />
        <NumberOfPeopleField />
      </div>
      <ResultCard />
    </form>
  );
};

export default Calculator;
