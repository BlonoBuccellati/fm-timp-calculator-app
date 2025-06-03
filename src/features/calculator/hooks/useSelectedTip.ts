import { useState } from "react";

import { NonZeroNumberSchema } from "../lib/schemas";

export function useSelectedTip(
  setSelectedTip: React.Dispatch<
    React.SetStateAction<{ value: string; isCustom: boolean }>
  >,
) {
  const [customTipDollar, setCustomTipDollar] = useState("");
  const [selectedTipPercent, setSelectedTipPercent] = useState("");
  const [customTipError, setCustomTipError] = useState("");

  const handleChangeInputTipDollar = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCustomTipDollar(e.target.value);
    setSelectedTipPercent("");

    // このコンポーネントの値
    setSelectedTip({ value: e.target.value, isCustom: true });
    validationError(e.target.value);
  };
  const handleTipButtonClick = (value: number) => {
    setCustomTipDollar("");
    setSelectedTipPercent(value.toString());

    // このコンポーネントの値
    setSelectedTip({ value: value.toString(), isCustom: false });
    //
    validationError(value.toString());
  };

  const validationError = (value: string) => {
    const validationField = NonZeroNumberSchema.safeParse({
      selectTip: Number(value),
    });
    if (validationField.success) {
      setCustomTipError("");
    } else {
      const message = validationField.error.flatten().fieldErrors.selectTip;
      setCustomTipError(message?.toString() ?? "");
    }
  };

  return {
    selectedTipPercent,
    handleTipButtonClick,
    customTipDollar,
    handleChangeInputTipDollar,
    customTipError,
  };
}
