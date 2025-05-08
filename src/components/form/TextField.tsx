import { Controller, Control, FieldValues, Path, FieldError } from 'react-hook-form';

interface TextFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  className?: string;
}

export const TextField = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  placeholder,
  type = 'text',
  disabled = false,
  className = ''
}: TextFieldProps<T>) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            className={`mt-1 block w-full rounded-md ${
              error ? 'border-red-300' : 'border-gray-300'
            } ${disabled ? 'bg-gray-100' : 'bg-white'} px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
          />
        )}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
