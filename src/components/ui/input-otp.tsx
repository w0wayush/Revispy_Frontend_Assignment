"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { cn } from "@/lib/utils";
import { DashIcon } from "@radix-ui/react-icons";

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

type InputOTPSlotProps = {
  index: number;
  char: string | null;
  hasFakeCaret?: boolean;
  isActive: boolean;
} & React.ComponentPropsWithoutRef<"div">;

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  InputOTPSlotProps
>(({ index, char, hasFakeCaret, isActive, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center border-y border-x border-input text-sm transition-all rounded-lg",
        isActive && "z-10 ring-2 ring-offset-background ring-ring",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" className="mx-1" {...props}>
    <DashIcon className="h-4 w-4 text-muted-foreground" />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
