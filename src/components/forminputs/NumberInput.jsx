import { Input } from "@/components/ui/input";
import React from "react";
import { Controller } from "react-hook-form";

function NumberInput({ name, control, placeholder, disabled }) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={placeholder}
            type="number"
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}

export default NumberInput;
