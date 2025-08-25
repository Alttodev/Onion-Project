import React, { useState } from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

export default function TableDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  className,
}) {
  const [open, setOpen] = useState(false);

  const handleClear = () => {
    onChange(undefined);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className={`${className} justify-between text-gray-700 font-normal border border-input cursor-pointer`}
        >
          <span className={value ? "" : "text-muted-foreground"}>
            {value ? format(new Date(value), "PPP") : placeholder}
          </span>
          <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          className="[&_.rdp-day]:cursor-pointer"
          onSelect={(selected) => {
            if (selected) {
              onChange(selected); 
            }
            setOpen(false); 
          }}
          captionLayout="dropdown"
        />
        <div className="p-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="cursor-pointer"
          >
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
