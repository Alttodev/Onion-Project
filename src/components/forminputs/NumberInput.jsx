
import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "../ui/input";

function NumberInput({ name, control, placeholder, disabled }) {
  return (
    <div className="relative">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <Input
              {...field}
              placeholder={placeholder}
              type="number"
              className=" text-gray-700" 
              disabled={disabled}
            />
          </>
        )}
      />
    </div>
  );
}

export default NumberInput;
