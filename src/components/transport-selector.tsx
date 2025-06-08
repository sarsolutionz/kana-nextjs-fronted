import { z } from "zod";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Loader, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { createNotificationSchema } from "@/features/members/schemas";

const transportOptions = [
  {
    value: "box",
    label: "Box",
  },
  {
    value: "house equipment",
    label: "House Equipment",
  },
  {
    value: "hazardous",
    label: "Hazardous Materials",
  },
  {
    value: "oversized",
    label: "Oversized Package",
  },
  {
    value: "high_value",
    label: "High Value Items",
  },
];

const STATIC_INSTRUCTIONS = `Courier Instructions:
- Handle package with care
- Verify recipient identity
- Get signature upon delivery
- Do not leave unattended

Courier item: `;

export type NotificationFormValues = z.infer<typeof createNotificationSchema>;

interface TransportSelectorProps {
  form: UseFormReturn<NotificationFormValues>;
  isLoading?: boolean;
}

export const TransportSelector = ({
  form,
  isLoading,
}: TransportSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Update textarea whenever selectedOptions changes
  useEffect(() => {
    const selectedItemsText = selectedOptions
      .map((opt) => transportOptions.find((o) => o.value === opt)?.label)
      .filter(Boolean)
      .join(", ");

    const newValue = `${STATIC_INSTRUCTIONS}${selectedItemsText || "None"}`;
    form.setValue("message", newValue);
  }, [selectedOptions, form]);

  const handleOptionSelect = (value: string) => {
    setSelectedOptions(
      (prev) =>
        prev.includes(value)
          ? prev.filter((opt) => opt !== value) // Remove if already selected
          : [...prev, value] // Add if not selected
    );
    setOpen(false); // Close the popover after selection
  };

  const handleRemoveOption = (value: string) => {
    setSelectedOptions((prev) => prev.filter((opt) => opt !== value));
  };

  if (isLoading) {
    return (
      <div className="size-6 w-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[250px] justify-between"
            >
              Select courier types...
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search courier types..." />
              <CommandList>
                <CommandEmpty>No courier type found.</CommandEmpty>
                <CommandGroup>
                  {transportOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleOptionSelect}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedOptions.includes(option.value)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      <div className="flex flex-col">
                        <span>{option.label}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="flex flex-wrap gap-2">
          {selectedOptions.map((option) => {
            const opt = transportOptions.find((o) => o.value === option);
            return (
              <Badge
                key={option}
                variant="outline"
                className="px-3 py-1 text-sm"
              >
                {opt?.label}
                <button
                  type="button"
                  onClick={() => handleRemoveOption(option)}
                  className="ml-2 rounded outline-none focus:ring-2 focus:ring-ring"
                >
                  <X className="size-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
};
