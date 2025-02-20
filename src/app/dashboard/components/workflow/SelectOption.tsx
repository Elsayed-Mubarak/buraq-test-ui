import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Option = { id: string; name: string };
type Props = {
  options: Option[];
  defaultValue?: string;
  placeholder: string;
};

export default function SelectOption({
  defaultValue,
  options,
  placeholder,
}: Props) {
  const [open, setOpen] = React.useState(false);




  return (

    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
          type="button"
        >
          {defaultValue
            ? options.find((option) => option.name === defaultValue)?.name
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {
              options.map((option, index) => (

                <>
                  <h1>{option.name}</h1>
                </>

              ))}

          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
