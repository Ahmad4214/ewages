import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary cursor-pointer text-primary-foreground shadow-xs hover:bg-primary/90",
        active:
          "bg-[#636DE8] cursor-pointer text-primary-foreground shadow-xs hover:bg-[#726EF9] text-white",
        destructive:
          "bg-destructive cursor-pointer text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border cursor-pointer bg-background text-grey-700 bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        deleteoutline:
          "border border-[#F2185D] text-[14px] font-[500] max-w-[160px] cursor-pointer bg-background text-[#F2185D] bg-transparent shadow-xs hover:bg-accent hover:text-[#c9144e] hover:border-[#c9144e] dark:bg-input/30 dark:border-input dark:hover:bg-input/50",

        secondary:
          "bg-secondary cursor-pointer text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 cursor-pointer",
        link: "text-primary underline-offset-4 hover:underline cursor-pointer",
      },
      size: {
        default: "h-[40px] px-10 py-[8px] has-[>svg]:px-3",
        sm: "h-[30px] rounded-[4px]  px-[7px] has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
