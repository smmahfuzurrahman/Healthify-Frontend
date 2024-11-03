import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define badge variants with enhanced design
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-gradient-to-r from-indigo-400 to-indigo-600 text-white shadow-lg",
        secondary:
          "border-transparent bg-gray-100 text-gray-800 shadow-sm hover:bg-gray-200",
        destructive:
          "border-transparent bg-red-500 text-white shadow-md hover:bg-red-600",
        outline:
          "border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge component with enhanced UI
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
