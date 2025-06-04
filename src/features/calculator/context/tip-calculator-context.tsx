import { createContext, PropsWithChildren, useContext, useMemo } from "react";

import { useCalculator as useCalculatorHooks } from "../hooks/useCalculator";
import { CalculatorContextType } from "../types/tip-calculator";

export const TipCalculatorContext = createContext<CalculatorContextType | null>(
  null,
);

export const TipCalculatorProvider = ({ children }: PropsWithChildren) => {
  const { values, setters, errors, result } = useCalculatorHooks();

  const contextValue: CalculatorContextType = useMemo(
    () => ({
      values,
      errors,
      setters,
      result,
    }),
    [values, errors, setters, result],
  );

  return (
    <TipCalculatorContext.Provider value={contextValue}>
      {children}
    </TipCalculatorContext.Provider>
  );
};

export const useCalculatorContext = (): CalculatorContextType => {
  const ctx = useContext(TipCalculatorContext);
  if (!ctx) {
    throw new Error("useCalculator はCalculatorProviderの中でしか呼べません");
  }
  return ctx;
};
