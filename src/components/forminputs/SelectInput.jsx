import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectInput = ({
  name,
  control,
  options,
  placeholder,
  disabled,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          className="text-gray-700"
          onValueChange={field.onChange}
          value={field.value || defaultValue}
          defaultValue={field.value || defaultValue}
          disabled={disabled}
        >
          <SelectTrigger className="w-full text-gray-700">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default SelectInput;
