import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const CustomerSelect = ({
  name,
  control,
  placeholder,
  disabled,
  defaultValue,
  options
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
            {options?.data?.map((c) => (
              <SelectItem className="cursor-pointer" key={c._id} value={c._id}>
                {c.username}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default CustomerSelect;
