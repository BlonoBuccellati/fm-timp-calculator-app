import { z } from "zod";

const toNumber = (val: unknown) => {
  return val === "" ? "" : Number(val);
};

const nonZeroSchema = (message: string = "Can’t be zero") => {
  return z.preprocess(
    toNumber,
    z.union([
      z.string(), //空文字列は許容
      z.coerce.number().refine((value) => value !== 0, { message }),
    ]),
  );
};

const nonSelectSchema = (message: string) => {
  return z.string().nonempty(message);
};

export const tipCalculatorSchema = z.object({
  bill: nonZeroSchema(),
  numPeople: nonZeroSchema(),
  selectedTip: nonSelectSchema("Must select tip"),
});

export type TipCalculatorType = z.infer<typeof tipCalculatorSchema>;
