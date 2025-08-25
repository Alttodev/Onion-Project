import { useState, useMemo } from "react";
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


const CustomerSelect = ({
  name,
  control,
  placeholder,
  disabled,
  defaultValue,
  options,
}) => {
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    if (!search) return options?.data || [];
    return options?.data?.filter((c) =>
      c.username.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, options]);

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

          <SelectContent className="max-h-60 overflow-y-auto">
            <div className="p-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-1 border rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Render filtered items */}
            {filteredOptions.map((c) => (
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
