import React from "react";
import { Controller } from "react-hook-form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";

function SelectInput({ name, control, placeholder, disabled, options = [] }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          disabled={disabled}
          onValueChange={field.onChange}
          value={field.value}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

export default SelectInput;
