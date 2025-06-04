import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "bg-grey-50 text-grey-550 typo-3 w-full rounded-[0.3125rem] px-100 text-right focus:outline-2 focus:outline-green-400",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
