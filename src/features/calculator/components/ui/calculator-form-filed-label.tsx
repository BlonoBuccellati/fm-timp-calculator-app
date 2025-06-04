import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const CalculatorFormFieldLabel = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<"label"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "label";
  return (
    <Comp
      className={cn("typo-5 text-grey-500 mr-auto block w-fit", className)}
      {...props}
    />
  );
};

export default CalculatorFormFieldLabel;
