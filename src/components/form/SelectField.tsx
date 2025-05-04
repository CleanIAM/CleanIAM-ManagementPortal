import { Controller, Control, FieldValues, Path, FieldError } from 'react-hook-form';

interface Option {
	label: string;
	value: string;
}

interface SelectFieldProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label: string;
	options: Option[];
	error?: FieldError;
	disabled?: boolean;
	className?: string;
}

export const SelectField = <T extends FieldValues>({
	name,
	control,
	label,
	options,
	error,
	disabled = false,
	className = ''
}: SelectFieldProps<T>) => {
	return (
		<div className={className}>
			<label className="block text-sm font-medium text-gray-700">{label}</label>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<select
						{...field}
						disabled={disabled}
						className={`mt-1 block w-full rounded-md ${
							error ? 'border-red-300' : 'border-gray-300'
						} bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
					>
						{options.map(option => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				)}
			/>
			{error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
		</div>
	);
};
