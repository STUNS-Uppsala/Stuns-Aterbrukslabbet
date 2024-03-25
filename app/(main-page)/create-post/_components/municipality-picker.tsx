"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ComboboxProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  list: string[];
}

export default function MunicipalityPicker({
  value,
  setValue,
  list,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-[230px] justify-between capitalize",
            value === "" && "text-muted-foreground normal-case"
          )}
        >
          {value ? list.find((listItem) => listItem === value) : "Välj kommun"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[230px] p-0">
        <Command>
          <CommandInput placeholder="Sök kommuner...." />
          <CommandList>
            {list.map((listItem) => (
              <CommandItem
                key={listItem}
                value={listItem}
                className="capitalize"
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === listItem ? "opacity-100" : "opacity-0"
                  )}
                />
                {listItem}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
