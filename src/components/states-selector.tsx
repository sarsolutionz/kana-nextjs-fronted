/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Check, ChevronsUpDown, Loader } from "lucide-react";

import { State, ICity } from "country-state-city";

import { Button } from "@/components/ui/button";
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
  const [currentView, setCurrentView] = React.useState<"cities" | "states">(
    "cities"
  );
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const commandRef = React.useRef<HTMLDivElement>(null);

  // Memoized data
  const states = React.useMemo(
    () => State.getStatesOfCountry(countryCode),
    [countryCode]
  );
  const [currentStateName, currentCity] = React.useMemo(
    () => (value?.includes(", ") ? value.split(", ") : ["", value || ""]),
    [value]
  );

  // Lazy load cities with Web Worker for better performance
  const [cities, setCities] = React.useState<ICity[]>([]);
  const workerRef = React.useRef<Worker>();

  React.useEffect(() => {
    if (open && currentView === "cities" && cities.length === 0) {
      setIsLoading(true);

      // Create worker if not exists
      if (!workerRef.current) {
        workerRef.current = new Worker(
          new URL("./cityWorker.ts", import.meta.url)
        );
      }

      workerRef.current.postMessage({
        type: "LOAD_CITIES",
        countryCode,
      });

      workerRef.current.onmessage = (e) => {
        if (e.data.type === "CITIES_LOADED") {
          setCities(e.data.cities);
          setIsLoading(false);
        }
      };

      return () => {
        workerRef.current?.terminate();
        workerRef.current = undefined;
      };
    }
  }, [open, currentView, countryCode]);

  // Optimized search with debouncing
  const [filteredCities, filteredStates] = React.useMemo(() => {
    const term = searchTerm.toLowerCase();
    const limitResults = 200; // Limit results for better performance

    const citiesResult = searchTerm
      ? cities
          .filter((city) => city.name.toLowerCase().includes(term))
          .slice(0, limitResults)
      : cities.slice(0, 100); // Show only first 100 when no search term

    const statesResult = searchTerm
      ? states
          .filter(
            (state) =>
              state.name.toLowerCase().includes(term) ||
              state.isoCode.toLowerCase().includes(term)
          )
          .slice(0, limitResults)
      : states.slice(0, 100);

    return [citiesResult, statesResult];
  }, [searchTerm, cities, states]);

  // Event handlers with memoization
  const handleCitySelect = React.useCallback(
    (cityName: string) => {
      const city = cities.find((c) => c.name === cityName);
      if (city) {
        const state = states.find((s) => s.isoCode === city.stateCode);
        if (state) {
          setCurrentView("states");
          setSearchTerm(state.name);
          onChange?.(`${state.name}, ${cityName}`);
        }
      }
    },
    [cities, states, onChange]
  );

  const handleStateSelect = React.useCallback(
    (stateName: string) => {
      onChange?.(`${stateName}, ${currentCity}`);
      setOpen(false);
    },
    [currentCity, onChange]
  );

  const handleBackToCities = React.useCallback(() => {
    setCurrentView("cities");
    setSearchTerm("");
  }, []);

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
          <span className="truncate">{value || "Select city..."}</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 w-[var(--radix-popover-trigger-width)] pointer-events-auto"
        align="start"
      >
        <Command shouldFilter={false} ref={commandRef}>
          {currentView === "states" && (
            <div className="flex items-center px-3 py-2 border-b sticky top-0 bg-background z-10">
              <button
                onClick={handleBackToCities}
                className="flex items-center text-sm text-muted-foreground hover:text-primary"
              >
                ← Back to cities
              </button>
              <span className="ml-2 font-medium truncate">{currentCity}</span>
            </div>
          )}

          <div className="sticky top-0 bg-background z-10 px-3 pt-2">
            <CommandInput
              placeholder={
                currentView === "cities" ? "Search city..." : "Search state..."
              }
              value={searchTerm}
              onValueChange={setSearchTerm}
              className="w-full"
            />
          </div>

          <CommandList className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Loader className="size-6 animate-spin text-muted-foreground" />
              </div>
            ) : currentView === "cities" ? (
              <>
                <CommandEmpty>
                  {cities.length === 0 ? "Loading cities..." : "No city found."}
                </CommandEmpty>
                <CommandGroup>
                  {filteredCities.map((city) => (
                    <CommandItem
                      key={`${city.stateCode}-${city.name}`}
                      value={city.name}
                      onSelect={() => handleCitySelect(city.name)}
                    >
                      {city.name}
                      <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            ) : (
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
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          currentStateName === state.name
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
