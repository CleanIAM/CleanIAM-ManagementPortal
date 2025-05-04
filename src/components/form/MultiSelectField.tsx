import React, { useState } from 'react';
import { UseFormSetValue, UseFormWatch, FieldValues, Path, FieldError } from 'react-hook-form';

interface Option {
	value: string;
	label: string;
	tooltip?: string;
}

interface MultiSelectFieldProps<T extends FieldValues> {
	name: Path<T>;
	label: string;
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
	options,
	setValue,
	watch,
	error,
	isLoading = false,
	className = ''
}: MultiSelectFieldProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectedValues = watch(name) as string[];

	const toggleOption = (value: string) => {
		if (selectedValues.includes(value)) {
			setValue(name, selectedValues.filter(v => v !== value) as any);
		} else {
			setValue(name, [...selectedValues, value] as any);
		}
	};

	const removeOption = (value: string, e: React.MouseEvent) => {
		e.stopPropagation();
		setValue(name, selectedValues.filter(v => v !== value) as any);
	};

	return (
		<div className={className}>
			<label className="block text-sm font-medium text-gray-700">{label}</label>

			<div className="relative mt-1">
				<div
					className={`border ${error ? 'border-red-300' : 'border-gray-300'} flex min-h-10 cursor-pointer flex-wrap gap-1 rounded-md p-1 shadow-sm`}
					onClick={() => setIsOpen(!isOpen)}
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
										onClick={e => removeOption(value, e)}
										className="ml-1 text-blue-600 hover:text-blue-800"
									>
										×
									</button>
								</div>
							))}
						</>
					)}
				</div>

				{isOpen && (
					<div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{isLoading ? (
							<div className="flex justify-center py-2">
								<div className="h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-blue-600"></div>
							</div>
						) : typeof options === 'string' ? (
							<div className="relative cursor-default select-none px-4 py-2 text-gray-500">
								{options}
							</div>
						) : options.length === 0 ? (
							<div className="relative cursor-default select-none px-4 py-2 text-gray-500">
								No options available
							</div>
						) : (
							options.map(option => {
								const isSelected = selectedValues.includes(option.value);
								return (
									<div
										key={option.value}
										onClick={() => toggleOption(option.value)}
										className={`relative cursor-pointer select-none py-2 pl-10 pr-4 ${isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
										title={option.tooltip}
									>
										<span
											className={`block truncate ${isSelected ? 'font-medium' : 'font-normal'}`}
										>
											{option.label || option.value}
										</span>
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
							})
						)}
					</div>
				)}
			</div>

			{error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
		</div>
	);
};
