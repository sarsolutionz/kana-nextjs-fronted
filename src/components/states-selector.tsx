"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { State, City } from "country-state-city";

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
import { Button } from "@/components/ui/button";

interface StateCitySelectorProps {
  countryCode: string;
  value?: string;
  onChange?: (value: string) => void;
}

const StateCitySelector = React.forwardRef<
  HTMLButtonElement,
  StateCitySelectorProps
>(({ countryCode, value, onChange }, ref) => {
  const [open, setOpen] = React.useState(false);
  const [currentView, setCurrentView] = React.useState<"states" | "cities">(
    "states"
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const commandRef = React.useRef<HTMLDivElement>(null);

  const currentLocation = value?.includes(", ")
    ? value.split(", ")
    : [value || "", ""];
  const [currentStateName, currentCity] = currentLocation;

  const states = State.getStatesOfCountry(countryCode);
  const currentState = states.find((s) => s.name === currentStateName);

  const cities = React.useMemo(() => {
    return currentState
      ? City.getCitiesOfState(countryCode, currentState.isoCode)
      : [];
  }, [currentState, countryCode]);

  const filteredStates = React.useMemo(() => {
    if (!searchTerm) return states;
    const term = searchTerm.toLowerCase();
    return states.filter(
      (state) =>
        state.name.toLowerCase().includes(term) ||
        state.isoCode.toLowerCase().includes(term)
    );
  }, [states, searchTerm]);

  const filteredCities = React.useMemo(() => {
    if (!searchTerm) return cities;
    const term = searchTerm.toLowerCase();
    return cities.filter((city) => city.name.toLowerCase().includes(term));
  }, [cities, searchTerm]);

  const handleStateSelect = (stateName: string) => {
    setCurrentView("cities");
    setSearchTerm("");
    onChange?.(stateName);
  };

  const handleCitySelect = (cityName: string) => {
    const newValue = `${currentStateName}, ${cityName}`;
    onChange?.(newValue);
    setOpen(false);
  };

  const handleBackToStates = () => {
    setCurrentView("states");
    setSearchTerm("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-left font-normal h-10 px-3 py-2"
        >
          <span className="truncate">{value || "Select state..."}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)] pointer-events-auto"
        align="start"
      >
        <Command shouldFilter={false} ref={commandRef}>
          {currentView === "cities" && (
            <div className="flex items-center px-3 py-2 border-b sticky top-0 bg-background z-10">
              <button
                onClick={handleBackToStates}
                className="flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                ← Back to states
              </button>
              <span className="ml-2 font-medium truncate">
                {currentStateName}
              </span>
            </div>
          )}

          <div className="sticky top-0 bg-background z-10 px-3 pt-2">
            <CommandInput
              placeholder={
                currentView === "states" ? "Search state..." : "Search city..."
              }
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="w-full"
            />
          </div>

          <CommandList className="max-h-[300px] overflow-y-auto">
            {currentView === "states" ? (
              <>
                <CommandEmpty>No state found.</CommandEmpty>
                <CommandGroup>
                  {filteredStates.map((state) => (
                    <CommandItem
                      key={state.isoCode}
                      value={state.name}
                      onSelect={() => handleStateSelect(state.name)}
                    >
                      {state.name}
                      <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : (
              <>
                <CommandEmpty>No city found.</CommandEmpty>
                <CommandGroup>
                  {filteredCities.map((city) => (
                    <CommandItem
                      key={`${currentState?.isoCode}-${city.name}`}
                      value={city.name}
                      onSelect={() => handleCitySelect(city.name)}
                    >
                      {city.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          currentCity === city.name
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});

StateCitySelector.displayName = "StateCitySelector";

export { StateCitySelector };
