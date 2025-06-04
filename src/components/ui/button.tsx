import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva("w-full rounded-[0.3125rem] hover:cursor-pointer", {
  variants: {
    variant: {
      tip: "typo-3 bg-green-900 py-[0.375rem] text-white hover:bg-green-400 hover:text-green-900",
      reset:
        "typo-3 bg-green-400 px-400 py-100 text-green-900 hover:bg-green-200",
      custom: "typo-4 text-grey-550 bg-grey-50",
    },
    size: {
      default: "",
      icon: "size-9",
    },
  },
  defaultVariants: {
    variant: "tip",
    size: "default",
  },
});

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
