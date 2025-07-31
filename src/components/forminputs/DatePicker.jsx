import React from "react";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";

function DatePicker({ name, control, placeholder = "Select date", disabled }) {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const date = field.value;

          return (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  disabled={disabled}
                  className="w-full justify-between   font-normal border border-input hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className={date ? "" : "text-muted-foreground"}>
                    {date ? format(new Date(date), "PPP") : placeholder}
                  </span>

                  <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selected) => field.onChange(selected)}
                  captionLayout="dropdown"
                  disabled={disabled}
                />
              </PopoverContent>
            </Popover>
          );
        }}
      />
    </div>
  );
}

export default DatePicker;
