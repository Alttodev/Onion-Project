import { Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCustomerName } from "@/hooks/customerhook";

const CustomerSelect = ({
  name,
  control,
  placeholder,
  disabled,
  defaultValue,
}) => {
  const { data, isLoading } = useCustomerName("customer");

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
          disabled={disabled || isLoading}
        >
          <SelectTrigger className="w-full text-gray-700">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {data?.data?.map((c) => (
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
