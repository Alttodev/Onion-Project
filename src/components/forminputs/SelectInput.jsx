import React from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

function SelectInput({ name, control, placeholder, disabled, options = [] }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        console.log("Select field value:", field.value),
        (
          <Select
            disabled={disabled}
            onValueChange={field.onChange}
            value={field.value}
            className="text-gray-700"
          >
            <SelectTrigger className="w-full text-gray-700">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="cursor-pointer">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      )}
    />
  );
}

export default SelectInput;
