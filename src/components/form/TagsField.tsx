import React, { useState } from 'react';
import { UseFormSetValue, UseFormWatch, FieldValues, Path, FieldError } from 'react-hook-form';

interface TagsFieldProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  error?: FieldError;
  placeholder?: string;
  className?: string;
}

export const TagsField = <T extends FieldValues>({
  name,
  label,
  setValue,
  watch,
  error,
  placeholder,
  className = '',
}: TagsFieldProps<T>) => {
  const [inputValue, setInputValue] = useState('');
  const tags = watch(name) as string[];

  const addTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setValue(name, [...tags, inputValue] as any);
      setInputValue('');
    }
  };

  const removeTag = (tag: string) => {
    setValue(name, tags.filter((t) => t !== tag) as any);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={`block w-full flex-1 rounded-none rounded-l-md border ${
            error ? 'border-red-300' : 'border-gray-300'
          } px-3 py-2 focus:border-blue-500 focus:ring-blue-500 sm:text-sm`}
        />
        <button
          type="button"
          onClick={addTag}
          className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}

      <div className="mt-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center rounded bg-blue-100 px-3 py-1 text-sm text-blue-800">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2 text-blue-600 hover:text-blue-800"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
