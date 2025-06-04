import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const CalculatorFieldTitle = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<"p"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp className={cn("typo-5 text-grey-500 block", className)} {...props} />
  );
};

export default CalculatorFieldTitle;
