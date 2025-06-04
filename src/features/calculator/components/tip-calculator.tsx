"use client";

import { TipCalculatorContext } from "../context/tip-calculator-context";
import { useCalculator } from "../hooks/use-calculator";

import CalculatorForm from "./calculator-form";
import ResultCard from "./result-card";

const TipCalculator = () => {
  // 状態管理
  const { values, setters, errors, result } = useCalculator();

  return (
    <TipCalculatorContext value={{ values, setters, errors, result }}>
      <section className="tablet:py-600 tablet:px-1000 tablet:rounded-[1.5625rem] desktop:max-w-[57.5rem] desktop:flex desktop:space-y-0 desktop:gap-600 desktop:p-400 mx-auto max-w-[38rem] space-y-400 rounded-t-[1.5625rem] bg-white px-300 py-400">
        <CalculatorForm />
        <ResultCard />
      </section>
    </TipCalculatorContext>
  );
};

export default TipCalculator;
