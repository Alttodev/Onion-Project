import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import React from "react";
import { Controller } from "react-hook-form";
import { cn } from "@/lib/utils";

function PhoneNumberInput({ name, control, placeholder, disabled, className }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="space-y-1">
          <PhoneInput
            international
            defaultCountry="IN"
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
              "file:border-0 file:bg-transparent file:text-sm file:font-medium",
              "text-gray-700",
              "placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error && "border-destructive focus-visible:ring-destructive/30",
              className
            )}
          />
        </div>
      )}
    />
  );
}

export default PhoneNumberInput;
