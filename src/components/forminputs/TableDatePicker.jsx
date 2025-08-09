import React, { useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";

export default function TableDatePicker({ value, onChange, placeholder, className }) {
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
          className={`${className} w-50 justify-between text-gray-700 font-normal border border-input cursor-pointer`}
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
          onSelect={onChange}
          captionLayout="dropdown"
        />
        <div className="p-2 flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleClear} className="cursor-pointer">
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
