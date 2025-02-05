import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectCurrencyProps {
  value: string;
  onChange: (currency: string) => void;
}

export function SelectCurrency({ value, onChange }: SelectCurrencyProps) {
  const currencyOptions = [
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "USD", label: "USD - United States Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "SAR", label: "SAR - Saudi Riyal" },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[255px] border-2 border-blue-400">
        <SelectValue placeholder="Select a default currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {currencyOptions.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
