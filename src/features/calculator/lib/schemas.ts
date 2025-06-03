import { z } from "zod";

export const NonZeroNumberSchema = z.object({
  nonZeroNumber: z.coerce
    .number()
    .refine((value) => value !== 0, { message: "Can’t be zero" }),
  selectTip: z.coerce
    .number()
    .refine((value) => value !== 0, { message: "Must select tip" }),
});
