"use client";

import { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

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

export default CalculatorFormField;
