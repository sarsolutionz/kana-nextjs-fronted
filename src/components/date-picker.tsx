"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface Props {
  value?: Date;
  onChange: (date: string) => void;
  disabled?: boolean;
}

const DatePicker = React.forwardRef<HTMLButtonElement, Props>(
  ({ value, onChange, disabled }, ref) => {
    const handleDateSelect = (date: Date | undefined) => {
      if (!date) return;

      const formattedDate = format(date, "yyyy-MM-dd");
      
      onChange(formattedDate);
    };

    return (
      <Popover modal>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            disabled={disabled}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "yyyy-MM-dd") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            disabled={disabled}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
