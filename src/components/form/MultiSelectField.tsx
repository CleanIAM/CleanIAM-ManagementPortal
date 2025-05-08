import React, { useState } from 'react';
import { UseFormSetValue, UseFormWatch, FieldValues, Path, FieldError } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '../ui/dialog';

interface Option {
  value: string;
  label: string;
  tooltip?: string;
}

interface MultiSelectFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  dialogTitle: string | null;
  dialogDescription: string | null;
  options: Option[] | string;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  error?: FieldError;
  isLoading?: boolean;
  className?: string;
}

export const MultiSelectField = <T extends FieldValues>({
  name,
  label,
  dialogTitle = null,
  dialogDescription = null,
  options,
  setValue,
  watch,
  error,
  isLoading = false,
  className = ''
}: MultiSelectFieldProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  // Get selected values from the form
  const selectedValues = watch(name) as string[];

  // Handle toggle option selection
  const handleToggleOption = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value];

    setValue(name, newValues as any, { shouldValidate: true });
  };

  // Handle remove option
  const handleRemoveOption = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setValue(name, selectedValues.filter(v => v !== value) as any, { shouldValidate: true });
  };

  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium text-gray-700">{label}</label>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div
            className={`border ${error ? 'border-red-300' : 'border-gray-300'} flex min-h-10 cursor-pointer flex-wrap gap-1 rounded-md p-1 shadow-sm`}
          >
            {selectedValues.length === 0 ? (
              <div className="p-1.5 text-sm text-gray-500">Select scopes...</div>
            ) : (
              <>
                {selectedValues.map(value => (
                  <div
                    key={value}
                    className="flex items-center rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                  >
                    {value}
                    <button
                      type="button"
                      onClick={e => handleRemoveOption(value, e)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{dialogTitle ?? 'Select Values'}</DialogTitle>
            <DialogDescription>
              {dialogDescription ?? 'Choose the values you need'}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
              </div>
            ) : typeof options === 'string' ? (
              <div className="py-4 text-center text-gray-500">{options}</div>
            ) : options.length === 0 ? (
              <div className="py-4 text-center text-gray-500">No scopes available</div>
            ) : (
              <div className="grid gap-1">
                {options.map(option => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleToggleOption(option.value)}
                      className={`relative cursor-pointer select-none rounded-md py-3 pl-10 pr-4 ${
                        isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
                      }`}
                      title={option.tooltip}
                    >
                      <span
                        className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}
                      >
                        {option.label || option.value}
                      </span>
                      {option.tooltip && (
                        <span className="block truncate text-xs text-gray-500">
                          {option.tooltip}
                        </span>
                      )}
                      {isSelected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
            >
              Done
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
