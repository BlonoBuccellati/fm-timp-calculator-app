import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const TypographyError = ({
  className,
  asChild,
  ...props
}: React.ComponentProps<"p"> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : "p";
  return (
    <Comp className={cn("typo-5 text-orange-400", className)} {...props} />
  );
};

export default TypographyError;
