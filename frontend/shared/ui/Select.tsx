import { cn } from "@/shared/libs/utils";
import { SelectHTMLAttributes, forwardRef } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="text-sm font-medium text-[#1C2B4F]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            "px-4 py-3 rounded-lg border border-[#E2E8F0]",
            "focus:outline-none focus:border-[#A4865A] focus:ring-1 focus:ring-[#A4865A]",
            "disabled:bg-gray-100 disabled:cursor-not-allowed",
            error && "border-red-500",
            className
          )}
          {...props}>
          <option value="">Выберите...</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

Select.displayName = "Select";