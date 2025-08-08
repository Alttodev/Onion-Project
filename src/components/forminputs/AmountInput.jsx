import { Input } from "@/components/ui/input";
import React from "react";
import { Controller } from "react-hook-form";

function AmountInput({ name, control, placeholder, disabled }) {
  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              ₹
            </span>
            <Input
              {...field}
              placeholder={placeholder}
              type="number"
              className="pl-6 text-gray-700" 
              disabled={disabled}
            />
          </>
        )}
      />
    </div>
  );
}

export default AmountInput;
