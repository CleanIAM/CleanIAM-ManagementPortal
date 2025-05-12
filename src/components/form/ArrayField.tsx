import { Cancel01Icon } from 'hugeicons-react';
import React, { useState } from 'react';
import {
  FieldValues,
  Path,
  FieldError,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';
import { ArrayFieldError } from '../../utils/errorUtils';
import { toast } from 'react-toastify';

interface ArrayFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  setValue: UseFormSetValue<T>;
  isInputValid?: (value: string) => boolean;
  validatorMessage?: string;
  watch: UseFormWatch<T>;
  error?: FieldError | ArrayFieldError | undefined;
  placeholder?: string;
  inputClassName?: string;
  className?: string;
  itemClassName?: string;
  renderItem?: (item: string, removeItem: () => void) => React.ReactNode;
}

export const ArrayField = <T extends FieldValues>({
  name,
  label,
  setValue,
  watch,
  isInputValid,
  validatorMessage,
  error,
  placeholder,
  inputClassName = '',
  className = '',
  itemClassName = '',
  renderItem
}: ArrayFieldProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const values = watch(name) as string[];

  const addItem = () => {
    if (isInputValid && !isInputValid(inputValue)) {
      toast.error(validatorMessage ?? 'Invalid input value');
      return;
    }
    if (inputValue && !values.includes(inputValue)) {
      setValue(name, [...values, inputValue] as unknown as T[Path<T>]);
      setInputValue('');
    }
  };

  const removeItem = (item: string) => {
    setValue(name, values.filter(v => v !== item) as unknown as T[Path<T>]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`block w-full flex-1 rounded-none rounded-l-md border ${
            error ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm ${inputClassName}`}
        />
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}

      <div className="mt-2 space-y-2">
        {values.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between rounded bg-gray-100 p-2 ${itemClassName}`}
          >
            {renderItem ? (
              renderItem(item, () => removeItem(item))
            ) : (
              <>
                <span className="text-sm">{item}</span>
                <button
                  type="button"
                  onClick={() => removeItem(item)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Cancel01Icon color="red" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
