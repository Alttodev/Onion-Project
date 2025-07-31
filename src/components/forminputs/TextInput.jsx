import { Input } from "@/components/ui/input";
import React from "react";
import { Controller } from "react-hook-form";

function TextInput({ name, control, placeholder, type, disabled }) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
          />
        )}
      />
    </div>
  );
}

export default TextInput;
