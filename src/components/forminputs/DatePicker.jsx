import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Controller } from "react-hook-form";
import { Calendar } from "../ui/calendar";
import { Button } from "../ui/button";

function DatePicker({ name, control, placeholder = "Select date", disabled }) {
  const [open, setOpen] = useState(false);
  const [flipUp, setFlipUp] = useState(false);
  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCalendar = () => {
    if (!buttonRef.current) return setOpen(!open);
    const rect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - rect.bottom;
    const calendarHeight = 300;
    setFlipUp(spaceBelow < calendarHeight);
    setOpen(!open);
  };

  return (
    <div className="flex flex-col gap-2 relative" ref={wrapperRef}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const date = field.value;

          return (
            <>
              <Button
                type="button"
                variant="outline"
                disabled={disabled}
                ref={buttonRef}
                className="w-full justify-between text-gray-700 font-normal border border-input"
                onClick={toggleCalendar}
              >
                <span className={date ? "" : "text-muted-foreground"}>
                  {date ? format(new Date(date), "PPP") : placeholder}
                </span>
              </Button>

              {open && (
                <div
                  className="absolute z-50 border shadow-lg"
                  style={{
                    top: flipUp ? "auto" : "100%",
                    bottom: flipUp ? "100%" : "auto",
                    marginTop: flipUp ? 0 : 4,
                    marginBottom: flipUp ? 4 : 0,
                    width: 260,
                    minWidth: 260,
                  }}
                >
                  <Calendar
                    mode="single"
                    selected={date ? new Date(date) : undefined}
                    onSelect={(selected) => {
                      field.onChange(selected);
                      setOpen(false);
                    }}
                    captionLayout="dropdown"
                    className="w-full [&_.rdp-day]:cursor-pointer"
                  />
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
}

export default DatePicker;
